import { use, useState } from "react";
import CountryCard from "./Card";

export default function CountryCardContainer({ data }) {
  const datam = use(data);
  const [totalVisited, setTotalVisited] = useState(0);
  const [modalData, setModalData] = useState(null);
  console.log(modalData)
  return (
    <>
      {/* modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <section className="flex items-center justify-between gap-2">
            {/* <img
              src={modalData.flags.flags.png}
              alt={modalData.flags.flags.alt}
              className="w-16 h-auto mb-2"
            />
            <div className="flex flex-col items-center justify-center">
              <p className="py-4">Capital : {modalData?.capital?.capital}</p>
              <p className="py-4">Area : {modalData?.area?.area}</p>
              <p className="py-4">currencies : {Object.keys(modalData?.currencies?.currencies)} ( {Object.values(modalData?.currencies?.currencies)[0].symbol} ) {Object.values(modalData?.currencies?.currencies)[0].name}</p>
            </div> */}
          </section>
          <h3 className="font-bold text-lg">{modalData?.name?.common} ({modalData?.name?.official})</h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* modal */}
      <h3>Total visited {totalVisited}</h3>
      <section className="grid grid-cols-4 gap-4 place-content-center p-4">
        {datam.map((e, i) => (
          <CountryCard
            key={i}
            e={e}
            i={i}
            setModalData={setModalData}
            setTotalVisited={setTotalVisited}
          />
        ))}
      </section>
    </>
  );
}
