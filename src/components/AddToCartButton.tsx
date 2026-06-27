import { useState, useRef, useEffect } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/data/products";

const ADDED_TIMEOUT = 1800;

type AddToCartButtonProps = {
  product: Product;
  className?: string;
};

const AddToCartButton = ({ product, className = "" }: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  const { tr } = useI18n();
  const [isAdded, setIsAdded] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = async () => {
    if (isPending || isAdded) return;
    setIsPending(true);

    const success = await addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    if (!success) {
      setIsPending(false);
      return;
    }

    toast.success(tr("cart.added", { item: product.name }));
    setIsAdded(true);
    setIsPending(false);

    timeoutRef.current = setTimeout(() => {
      setIsAdded(false);
    }, ADDED_TIMEOUT);
  };

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      disabled={isPending || isAdded}
      className={`${className} inline-flex items-center justify-center gap-2 transition-all duration-200`}
      aria-label={
        isAdded
          ? tr("products.added")
          : `${tr("products.addtocart")} ${product.name}`
      }
    >
      {isAdded ? (
        <>
          <Check className="h-4 w-4" />
          <span>{tr("products.added")}</span>
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          <span>{tr("products.addtocart")}</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
