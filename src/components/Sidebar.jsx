import { Link } from "react-router";

export default function Sidebar({ genres }) {
  return (
    <aside className="w-52 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-[#fef08a]/10 bg-[#050a15] px-4 py-6">
      <h2 className="font-orbitron text-sm font-bold tracking-widest text-[#3b82f6] uppercase mb-5 px-1">
        Genres
      </h2>
      <ul className="space-y-1">
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link
              to={`/genre/${genre.slug}`}
              className="block rounded px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#0d1b35] hover:text-[#fef08a] transition-colors duration-200"
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
