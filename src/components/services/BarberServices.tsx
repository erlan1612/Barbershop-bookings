import { services } from "@/data/services";

export default function BarberServices() {
  return (
    <div>
      <h1>Barber Dashboard - Services</h1>

      <div>
        {services.map((service) => (
          <div key={service.id} style={{ border: "1px solid gray", padding: 10 }}>
            <h3>{service.name}</h3>
            <p>Duration: {service.duration}</p>
            <p>Price: {service.price} som</p>

            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>

      <button style={{ marginTop: 20 }}>
        + Add new service
      </button>
    </div>
  );
}