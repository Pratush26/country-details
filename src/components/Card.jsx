import { BsInfoLg } from "react-icons/bs";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";

export default function CountryCard({ e, i, setModalData, refreshLocalStorage }) {
    let handleModal = (m) => {
        document.getElementById('my_modal_5').showModal()
        setModalData(m)
    }
    let visitedCountries = JSON.parse(localStorage.getItem("visitedCountries"));
    let bookmarkedCountries = JSON.parse(localStorage.getItem("bookmarkedCountries"));
    let btnClick = (type) => {
        if (type === "bookmark") {
            if (!bookmarkedCountries) {
                localStorage.setItem("bookmarkedCountries", JSON.stringify([e.ccn3.ccn3]));
            } else {
                if (bookmarkedCountries.includes(e.ccn3.ccn3)) {
                    bookmarkedCountries = bookmarkedCountries.filter(c => c !== e.ccn3.ccn3);
                    localStorage.setItem("bookmarkedCountries", JSON.stringify(bookmarkedCountries));
                } else {
                    bookmarkedCountries.push(e.ccn3.ccn3);
                    localStorage.setItem("bookmarkedCountries", JSON.stringify(bookmarkedCountries));
                }
            }
        } else {
            if (!visitedCountries) {
                localStorage.setItem("visitedCountries", JSON.stringify([e.ccn3.ccn3]));
            } else {
                if (visitedCountries.includes(e.ccn3.ccn3)) {
                    visitedCountries = visitedCountries.filter(c => c !== e.ccn3.ccn3);
                    localStorage.setItem("visitedCountries", JSON.stringify(visitedCountries));
                } else {
                    visitedCountries.push(e.ccn3.ccn3);
                    localStorage.setItem("visitedCountries", JSON.stringify(visitedCountries));
                }
            }
        }
        refreshLocalStorage();
    }
    return (
        <span
            key={i}
            className={`px-2 py-4 border rounded flex flex-col items-center justify-center h-full ${(visitedCountries || []).includes(e.ccn3.ccn3) ? "bg-gray-700 text-white" : ""}`}
        >
            <div className="flex items-center w-full gap-2 p-2">
                <img
                    src={e.flags.flags.png}
                    alt={e.flags.flags.alt}
                    className="w-16 h-auto mb-2"
                />
                <span>
                    <p className="font-semibold">
                        {e.name.common} <small>({e.population.population})</small>
                    </p>
                    {e.languages?.languages &&
                        Object.entries(e.languages.languages)
                            .slice(0, 3) // take only the first 3
                            .map(([key, value]) => (
                                <span key={key} className="text-xs m-1 text-gray-200">
                                    {value}
                                </span>
                            ))}
                </span>
            </div>
            <div className="flex items-center justify-around gap-2 w-full">
                <button
                    onClick={() => btnClick("visited")}
                    className={`btn ${(visitedCountries || []).includes(e.ccn3.ccn3) ? "btn-neutral" : "btn-soft"}`}
                >
                    {(visitedCountries || []).includes(e.ccn3.ccn3) ? "Visited" : "Not Visited"}
                </button>
                <button className="btn" onClick={() => handleModal(e)}><BsInfoLg /></button>
                <button className="btn" onClick={() => btnClick("bookmark")}>{(bookmarkedCountries || []).includes(e.ccn3.ccn3) ? <FaBookmark /> : <FaRegBookmark />}</button>
            </div>
        </span>
    );
}
