import { useMemo } from "react";
import useStatusStore from "../../store/statusStore";

export default function AllServices() {
  const allServices = useStatusStore(({ allServices }) => allServices);
  const allServicesMemo = useMemo(() => allServices, [allServices]);
  return (
    <div>
      <h3>All Services</h3>
      {allServicesMemo.map((service) => (
        <div key={service.region}>
          <p>
            <strong>Region:</strong> {service.region}
          </p>
          <p>
            <strong>Status:</strong> {service.status}
          </p>
        </div>
      ))}
    </div>
  );
}
