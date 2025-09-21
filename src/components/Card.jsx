import { useState } from "react";
import { BsInfoLg } from "react-icons/bs";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";

export default function CountryCard({ e, i, setTotalVisited, setModalData }) {
    const [visited, setVisited] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    let handleModal = (m) => {
      document.getElementById('my_modal_5').showModal()
      setModalData(m)
    }

    return (
        <span
            key={i}
            className={`px-2 py-4 border rounded flex flex-col items-center justify-center h-full ${visited ? "bg-gray-700 text-white" : ""}`}
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
                    onClick={() => {
                        setVisited(!visited);
                        setTotalVisited(prev => !visited ? prev + 1 : prev - 1);
                    }}
                    className={`btn ${visited ? "btn-neutral" : "btn-soft"}`}
                >
                    {visited ? "Visited" : "Not Visited"}
                </button>
                <button className="btn" onClick={() => handleModal(e)}><BsInfoLg /></button>
                <button className="btn" onClick={() => setBookmarked(!bookmarked)}>{bookmarked ? <FaBookmark /> : <FaRegBookmark />}</button>
            </div>
        </span>
    );
}
