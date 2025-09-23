import { Suspense, useState, } from "react";
import favicon from "./assets/flag-108-svgrepo-com.svg";
import "./App.css";
import CountryCardContainer from "./components/CardContainer";

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
  return (
    <main>
      <nav className="w-11/12 mx-auto flex in-checked: justify-between p-2">
        <a href="/"><img src={favicon} alt="Vite logo" className="h-8 w-auto" /></a>
        <form action="">
          <input type="text" placeholder="Search by country name" name="countryName" id="countryName" className="input input-sm" />
        </form>
      </nav>
      <section className="flex flex-col items-center justify-center text-center my-14 gap-2">
        <h1 className="text-5xl font-bold">Welcome to world countries</h1>
        <h4>Find your desired country details from here</h4>
      </section>
      <div className="w-11/12 mx-auto my-4 font-semibold">
        <h3>Total visited : {visitedCountries?.length || 0}</h3>
        <h3>Bookmarked : {bookmarkedCountries?.length || 0}</h3>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <CountryCardContainer data={dataPromise} refreshLocalStorage={refreshLocalStorage} />
      </Suspense>
    </main>
  );
}