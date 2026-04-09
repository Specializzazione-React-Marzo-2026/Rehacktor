export default function Gamecard({ game }) {
    const releasedDate = game?.released
        ? new Date(game.released).toLocaleDateString("it-IT", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            })
        : "Data non disponibile";

    return (
        <article className="group relative overflow-hidden rounded-2xl bg-[#0d1b35] transition-transform duration-300 hover:-translate-y-1.5">
            {/* Glow border */}
            <div className="pointer-events-none absolute inset-0 z-30 rounded-2xl ring-1 ring-inset ring-white/10 transition duration-300 group-hover:ring-[#facc15]/40 group-hover:shadow-[0_8px_30px_rgba(254,240,138,0.15)]" />

            {/* Image */}
            <div className="relative h-52 w-full overflow-hidden bg-[#0d1b35]">
                <img
                    src={game?.background_image || "https://placehold.co/600x400/0f172a/e2e8f0?text=No+Image"}
                    alt={game?.name || "Game cover"}
                    className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute bottom-3 left-3 z-20 flex gap-2 ">
                    <span className="metascore_badge_custom">
                        ★ {game?.metacritic ?? "–"}
                    </span>
                    <span className="rating_badge_custom">
                        ♥ {game?.rating ?? "–"}
                    </span>
                </div>
            </div>

            <div className="relative z-20 space-y-3 p-4">
                <h2 className="line-clamp-2 min-h-[3rem] text-base font-bold leading-snug text-white transition-colors duration-200 group-hover:text-[#fef08a]">
                    {game?.name || "Titolo sconosciuto"}
                </h2>

                <div className="flex items-center justify-between border-t border-[#fef08a]/[0.08] pt-3 text-xs text-[#94a3b8]">
                    <span className="uppercase tracking-wider">Uscita</span>
                    <span className="font-medium text-[#94a3b8]">{releasedDate}</span>
                </div>
            </div>
        </article>
    );
}