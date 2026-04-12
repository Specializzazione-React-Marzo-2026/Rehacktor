import { Link } from "react-router";

const fallbackImage = "https://placehold.co/600x900/081120/e2e8f0?text=No+Image";

export default function Gamecard({ game }) {
    const rating = typeof game?.rating === "number" ? game.rating.toFixed(1) : "–";
    const platformNames = (game?.parent_platforms ?? game?.platforms ?? [])
        .map((entry) => entry.platform?.name ?? entry.name)
        .filter(Boolean)
        .slice(0, 3);

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a1628]  transition duration-300 hover:-translate-y-1 hover:border-[#fef08a]/25 hover:shadow-[0_16px_48px_rgba(254,240,138,0.08)]">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#081120]">
                <img
                    src={game?.background_image || fallbackImage}
                    alt={game?.name || "Game cover"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent" />

                {/* Piattaforme — alto a sinistra */}
                {platformNames.length > 0 && (
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                        {platformNames.map((name) => (
                            <span
                                key={name}
                                className="rounded-full bg-black/50 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                )}

                {/* Badge rating + metacritic — alto a destra */}
                <div className="absolute right-3 top-3 flex gap-1.5">
                    <span className="rounded-full bg-black/50 px-2.5 py-1 text-[0.65rem] font-bold text-[#fef08a] backdrop-blur-sm">
                        ★ {game?.metacritic ?? "–"}
                    </span>
                    <span className="rounded-full bg-black/50 px-2.5 py-1 text-[0.65rem] font-bold text-[#7dd3fc] backdrop-blur-sm">
                        ♥ {rating}
                    </span>
                </div>

                {/* Titolo — sovrapposto in basso sull'immagine */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                    <Link
                        to={`/detail/${game?.id}`}
                        className="line-clamp-2 text-base font-bold leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] transition-colors duration-200 cursor-pointer hover:text-[#fef08a]"
                    >
                        {game?.name || "Titolo sconosciuto"}
                    </Link>
                </div>
            </div>
        </article>
    );
}