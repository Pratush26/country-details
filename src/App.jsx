import { Suspense, useState } from "react";
import favicon from "./assets/flag-108-svgrepo-com.svg";
import "./App.css";
import CountryCardContainer from "./components/CardContainer";
import { SearchContext } from "./context/context";

// Async data loader
async function getCountries() {
  const res = await (await fetch("https://openapi.programming-hero.com/api/all")).json();
  return res.countries;
}
const dataPromise = getCountries(); // create a promise

export default function App() {
  const [visitedCountries, setVisitedCountries] = useState(JSON.parse(localStorage.getItem("visitedCountries")));
  const [bookmarkedCountries, setBookmarkedCountries] = useState(JSON.parse(localStorage.getItem("bookmarkedCountries")));

  // Function to refresh from localStorage
  const refreshLocalStorage = () => {
    setVisitedCountries(JSON.parse(localStorage.getItem("visitedCountries")));
    setBookmarkedCountries(JSON.parse(localStorage.getItem("bookmarkedCountries")));
  };
  // filter funcionality
  const [searchWord, setSearchWord] = useState('')
  const [selectedOption, setSelectedOption] = useState('name')
  return (
    <main>
      <nav className="w-11/12 mx-auto flex gap-4 in-checked: justify-between py-6 px-2">
        <a href="/"><img src={favicon} alt="Vite logo" className="h-8 w-auto" /></a>
        <form className="join">
          <div>
            <div>
              <input defaultValue={searchWord} onChange={e => setSearchWord(e.target.value)} className="input join-item border-none" placeholder="Search" />
            </div>
          </div>
          <select defaultValue={selectedOption} onChange={e => setSelectedOption(e.target.value)} className="select join-item w-fit border-none">
            <option value='name'>Name</option>
            <option value='region'>Region</option>
            <option value='languages'>Language</option>
            <option value='continents'>Continent</option>
            <option value='capital'>Capital</option>
            <option value='ccn3'>ccn3</option>
          </select>
        </form>
      </nav>
      <section className="flex flex-col items-center justify-center text-center my-14 gap-2">
        <h1 className="text-5xl font-bold">Welcome to world countries</h1>
        <h4>Find your desired country details from here & mark your future plan</h4>
      </section>
      <div className="w-11/12 mx-auto my-4 font-semibold">
        <h3>Total visited : {visitedCountries?.length || 0}</h3>
        <h3>Bookmarked : {bookmarkedCountries?.length || 0}</h3>
      </div>
      <Suspense fallback={<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 place-content-center p-4">
        <div className="w-full h-30 skeleton"></div>
        <div className="w-full h-30 skeleton"></div>
        <div className="w-full h-30 skeleton"></div>
        <div className="w-full h-30 skeleton"></div>
        <div className="w-full h-30 skeleton"></div>
        <div className="w-full h-30 skeleton"></div>
        <div className="w-full h-30 skeleton"></div>
        <div className="w-full h-30 skeleton"></div>
        <div className="w-full h-30 skeleton"></div>
        <div className="w-full h-30 skeleton"></div>
      </section>}>
        <SearchContext.Provider value={{ searchWord, selectedOption }}>
          <CountryCardContainer data={dataPromise} refreshLocalStorage={refreshLocalStorage} />
        </SearchContext.Provider>
      </Suspense>
    </main>
  );
}