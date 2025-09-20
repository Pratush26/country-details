import { use, useState } from "react";
import CountryCard from "./Card";

export default function CountryCardContainer({ data }) {
  const datam = use(data);
  const [totalVisited, setTotalVisited] = useState(0);

  return (
    <>
      <h3>Total visited {totalVisited}</h3>
      <section className="grid grid-cols-4 gap-4 place-content-center p-4">
        {datam.map((e, i) => (
          <CountryCard
            key={i}
            e={e}
            i={i}
            setTotalVisited={setTotalVisited}
          />
        ))}
      </section>
    </>
  );
}
