import { use, useContext, useState, useEffect } from "react";
import CountryCard from "./Card";
import { SearchContext } from "../context/context";

export default function CountryCardContainer({ data, refreshLocalStorage }) {
  const datam = use(data);
  const [modalData, setModalData] = useState(null);

  // search fucntionality
  const { searchWord, selectedOption } = useContext(SearchContext)
  const [dataSet, setDataSet] = useState(datam)
  const [list, setList] = useState('all')
  useEffect(() => {
    if (searchWord) {
      setDataSet(datam.filter(e =>
        selectedOption === 'name' ?
          e.name.common.trim().toLowerCase().includes(searchWord.trim().toLowerCase())
          :
          selectedOption === 'languages' ?
            Object.values(e.languages.languages).some(lang => lang.toLowerCase().includes(searchWord.trim().toLowerCase()))
            :
            selectedOption === 'region' ?
              e.region.region.trim().toLowerCase().includes(searchWord.trim().toLowerCase())
              :
              selectedOption === 'capital' ?
                e.capital.capital.find(f => f.toLowerCase().includes(searchWord.toLowerCase()))
                :
                selectedOption === 'continents' ?
                  e.continents.continents.find(f => f.toLowerCase().includes(searchWord.toLowerCase()))
                  :
                  e.ccn3.ccn3.includes(searchWord))
      )
    }
    else if(list === 'bookmarked'){
      const localdata = JSON.parse(localStorage.getItem("bookmarkedCountries"))
      setDataSet(datam.filter(e => localdata.includes(e.ccn3.ccn3)))
    } 
    else if(list === 'visited'){
      const localdata = JSON.parse(localStorage.getItem("visitedCountries"))
      setDataSet(datam.filter(e => localdata.includes(e.ccn3.ccn3)))
    } 
    else setDataSet(datam)
  }, [searchWord, selectedOption, datam, list])

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
      <div className="flex justify-end gap-3 w-11/12 mx-auto">
        <button onClick={() => setList(list === 'visited' ? 'all' : 'visited')} className={`px-4 py-2 rounded-sm cursor-pointer ${list === 'visited' ? 'bg-gray-700 border' : 'bg-gray-900'}`}>Visited Countries</button>
        <button onClick={() => setList(list === 'bookmarked' ? 'all' : 'bookmarked')} className={`px-4 py-2 rounded-sm cursor-pointer ${list === 'bookmarked' ? 'bg-gray-700 border' : 'bg-gray-900'}`}>Bookmarked Countries</button>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 place-content-center p-4">
        {dataSet.map((e, i) => (
          <CountryCard
            key={i}
            e={e}
            i={i}
            setModalData={setModalData}
            refreshLocalStorage={refreshLocalStorage}
          />
        ))}
      </section>
    </>
  );
}
