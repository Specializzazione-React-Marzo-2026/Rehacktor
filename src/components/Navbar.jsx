import { Link, useNavigate } from "react-router";
import routes from "../router/routes";
import { useState } from "react";

export default function Navbar() {

	const [slug, setSlug] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setSlug(e.target.value);
	};

	const handleSearch = (e) => {
		if (e.key === "Enter" && slug.trim()) {
			navigate(`/search/${slug.trim()}`);
			setSlug("");
		}
	};

	
	return (
		<header className="border-b border-[#fef08a]/10 bg-[#050a15]/95 text-white backdrop-blur">
			<nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
				<Link className="font-orbitron text-xl font-bold tracking-[0.2em] text-[#fef08a] transition-colors hover:text-[#facc15]" to={routes.home}>
					REHACKTOR
				</Link>

				<div className="flex items-center gap-4 text-sm font-medium text-[#94a3b8]">
                    <input type="text" className="rounded-md border border-[#3b82f6]/40 bg-[#0d1b35] text-white placeholder-[#94a3b8]/60 focus:border-[#fef08a] focus:ring focus:ring-[#fef08a]/20 focus:outline-none px-3 py-1.5" placeholder="Search..." value={slug} onChange={handleChange} onKeyDown={handleSearch} />
					<Link className="transition hover:text-[#fef08a]" to={routes.home}>Home</Link>
					<Link className="transition hover:text-[#fef08a]" to={routes.info}>Info</Link>
					<Link className="transition hover:text-[#fef08a]" to={routes.login}>Login</Link>
					<Link className="transition hover:text-[#fef08a]" to={routes.register}>Register</Link>
				</div>
			</nav>
		</header>
	);
}