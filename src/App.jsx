import { Suspense } from "react";
import favicon from "./assets/favicon.ico";
import "./App.css";
import CountryCardContainer from "./components/CardContainer";

// Async data loader
async function getCountries() {
  const res = await (await fetch("https://openapi.programming-hero.com/api/all")).json();
  return res.countries;
}

export default function App() {
  const dataPromise = getCountries(); // create a promise

  return (
    <main>
      <nav className="w-11/12 mx-auto flex in-checked: justify-between p-2">
        <a href="/"><img src={favicon} alt="Vite logo" className="dark:invert h-8 w-auto" /></a>
        <form action="">
          <input type="text" name="name" id="name" className="bg-white" />
        </form>
      </nav>
      <h1>Welcome to world countries</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CountryCardContainer data={dataPromise} />
      </Suspense>
    </main>
  );
}





// [
//   {
//     "name": {
//       "common": "Jamaica",
//       "official": "Jamaica"
//     },
//     "ccn3": {
//       "ccn3": "388"
//     },
//     "currencies": {
//       "currencies": {
//         "JMD": {
//           "name": "Jamaican dollar",
//           "symbol": "$"
//         }
//       }
//     },
//     "capital": {
//       "capital": [
//         "Kingston"
//       ]
//     },
//     "region": {
//       "region": "Americas"
//     },
//     "languages": {
//       "languages": {
//         "eng": "English",
//         "jam": "Jamaican Patois"
//       }
//     },
//     "area": {
//       "area": 10991
//     },
//     "cca3": {
//       "cca3": "JAM"
//     },
//     "population": {
//       "population": 2961161
//     },
//     "continents": {
//       "continents": [
//         "North America"
//       ]
//     },
//     "flags": {
//       "flags": {
//         "png": "https://flagcdn.com/w320/jm.png",
//         "svg": "https://flagcdn.com/jm.svg",
//         "alt": "The flag of Jamaica is divided by a gold diagonal cross into four alternating triangular areas of green at the top and bottom, and black on the hoist and fly sides"
//       }
//     }
//   },