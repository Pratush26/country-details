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
          <section className="grid grid-cols-[30%_70%] items-center justify-start gap-4">
            <img
              src={modalData?.flags?.flags?.png}
              alt={modalData?.flags?.flags?.alt}
              className="w-full h-auto mb-2"
            />
            <div className="flex flex-col items-start justify-center">
              <p>Capital : {modalData?.capital?.capital}</p>
              <p>Region : {modalData?.region?.region}</p>
              <p>Continents : {modalData?.continents?.continents}</p>
            </div>
          </section>
          {/* <p>currencies : {Object.keys(modalData?.currencies?.currencies)} ( {Object.values(modalData?.currencies?.currencies)[0].symbol} ) {Object.values(modalData?.currencies?.currencies)[0].name}</p> */}
          <h3 className="font-bold text-lg my-2">{modalData?.name?.common} ({modalData?.name?.official})</h3>
          <p>Currencies : {modalData?.currencies && Object.keys(modalData.currencies.currencies)[0]} ({modalData?.currencies && Object.values(modalData.currencies.currencies)[0].symbol}) {modalData?.currencies && Object.values(modalData.currencies.currencies)[0].name}</p>
          <div className="grid grid-cols-2 items-center justify-items-start gap-1 my-2 flex-wrap">
            <p>Population : {modalData?.population?.population}</p>
            <p>Area : {modalData?.area?.area}</p>
            <p>ccn3 : {modalData?.ccn3?.ccn3}</p>
            <p>cca3 : {modalData?.cca3?.cca3}</p>
          </div>
          <p>Languages<br />{modalData?.languages && Object.values(modalData.languages.languages).join(", ")}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* modal */}
      <div className="w-11/12 mx-auto my-4 font-semibold">
      <h3>Total visited : {totalVisited}</h3>
      <h3>Bookmarked : {totalVisited}</h3>
      </div>
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
