import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Master } from "@/data/masters";
import BookingDialog from "@/components/BookingDialog";
import { useI18n } from "@/lib/i18n";
import { formatYears } from "@/utils/formatYears";

const MasterCard = ({ master }: { master: Master }) => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { tr, tv} = useI18n();

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="group relative overflow-hidden rounded-2xl border border-border bg-card card-shadow transition-shadow duration-200 hover:card-shadow-hover h-full"
      >
        <Link to={`/masters/${master.id}`} className="block">
           <div className="h-36 xl:h-80 overflow-hidden rounded-lg">
            <img
              src={master.image}
              alt={master.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>
          <div className="p-7 xl:p-8">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link to={`/masters/${master.id}`} className="hover:underline">
                <h3 className="text-base sm:text-lg font-medium tracking-tight">{master.name}</h3>
              </Link>
              <div className="mt-3 xl:mt-4 text-xs sm:text-sm text-muted-foreground">
                <p>{tv("role", master.role)}</p>
                <p>Стаж: {formatYears(master.experience)}</p>
              </div>
              <p className="line-clamp-1 mt-2 xl:mt-3 text-xs text-muted-foreground leading-relaxed">
                {master.salonName || tr("masters.unassignedSalon")}
              </p>
            </div>
            {master.available && (
              <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                {tr("master.available")}
              </span>
            )}
          </div>
           <div className="mt-3 sm:mt-4 xl:mt-5 flex items-center gap-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="tabular font-medium text-foreground">{master.rating}</span>
            <span>- {master.reviews} {tr("master.reviews")}</span>
          </div>
          <button
            onClick={() => setBookingOpen(true)}
            disabled={!master.available}
             className="mt-5 sm:mt-6 xl:mt-7 flex h-11 sm:h-13 xl:h-14 w-full items-center justify-center rounded-lg bg-primary px-5 xl:px-6 py-2.5 sm:py-3 text-xs sm:text-sm xl:text-base font-medium text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"
          >
            {master.available ? tr("master.book") : tr("master.nobook")}
          </button>
        </div>
      </motion.div>
      <BookingDialog master={master} open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
};

export default MasterCard;
