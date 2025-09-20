import { useState } from "react";

export default function CountryCard({ e, i, setTotalVisited }) {
    const [visited, setVisited] = useState(false);

    return (
        <span
            key={i}
            className={`p-2 border rounded flex flex-col items-center justify-center h-full ${visited ? "bg-gray-700 text-white" : ""}`}
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
                                <p key={key} className="text-sm text-gray-200">
                                    {value}
                                </p>
                            ))}
                </span>
            </div>
            <div className="flex items-center justify-around gap-2 w-full">
                <button
                    onClick={() => {
                        setVisited(!visited);
                        setTotalVisited(prev => !visited ? prev + 1 : prev - 1);
                    }}
                    className="px-2 py-1 rounded text-sm bg-indigo-700 text-white hover:bg-indigo-800"
                >
                    {visited ? "Visited" : "Not Visited"}
                </button>

                <button className="px-2 py-1 rounded text-sm bg-indigo-700 text-white hover:bg-indigo-800">
                    ss
                </button>
            </div>
        </span>
    );
}
