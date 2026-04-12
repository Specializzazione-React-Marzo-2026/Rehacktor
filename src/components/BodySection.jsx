import { useContext } from "react";
import { UserContext } from "../context/user-context";

export default function BodySection({ game }) {
  const { user, profile } = useContext(UserContext);
  const ownerId = profile?.id ?? user?.id ?? null;

  if (!ownerId) return null;

  return (
    <section className="relative mx-auto mt-16 max-w-4xl px-4">
      {/* ── Reviews ── */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#7dd3fc]">
          Community
        </span>
        <h3 className="font-orbitron text-xl font-bold text-white">Reviews</h3>
        <textarea
          className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#071121]/60 p-4 text-sm leading-7 text-[#cbd5e1] placeholder-[#475569] backdrop-blur-xl transition focus:border-[#7dd3fc]/40 focus:outline-none focus:ring-1 focus:ring-[#7dd3fc]/20"
          rows={4}
          placeholder="Inserisci la tua recensione..."
        />
      </div>
    </section>
  );
}
