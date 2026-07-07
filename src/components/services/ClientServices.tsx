import { services } from "@/data/services";

export default function ClientServices() {
  return (
    <div>
      <h1>Available Services</h1>

      <div>
        {services.map((service) => (
          <div key={service.id}>
            <h3>{service.name}</h3>
            <p>{service.duration}</p>
            <p>{service.price} som</p>
          </div>
        ))}
      </div>
    </div>
  );
}