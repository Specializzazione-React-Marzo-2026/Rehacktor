import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../context/user-context";
import supabase from "../database/supabase";
import routes from "../router/routes";
import Placeholder from "../assets/Portrait_Placeholder.png";
import "./profile_update.css";

function handleAvatarError(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = Placeholder;
}

export default function ProfilePage() {
  const { user, profile } = useContext(UserContext);
  const [avatarSource, setAvatarSource] = useState(Placeholder);

  useEffect(() => {
    if (!profile?.avatar_url) {
      setAvatarSource(Placeholder);
      return;
    }

    if (profile.avatar_url.startsWith("http")) {
      setAvatarSource(profile.avatar_url);
      return;
    }

    supabase.storage
      .from("avatars")
      .createSignedUrl(profile.avatar_url, 3600)
      .then(({ data, error }) => {
        if (error || !data?.signedUrl) {
          setAvatarSource(Placeholder);
        } else {
          setAvatarSource(data.signedUrl);
        }
      });
  }, [profile?.avatar_url]);

  if (!user) {
    return (
      <main className="profile-shell">
        <section className="profile-panel profile-panel--empty">
          <span className="profile-badge">Account area</span>
          <h1 className="profile-title">Sessione non disponibile</h1>
          <p className="profile-lead">
            Effettua l&apos;accesso per vedere il tuo profilo e modificare i dati.
          </p>
        </section>
      </main>
    );
  }

  const memberSince = user.created_at
    ? new Intl.DateTimeFormat("it-IT", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(user.created_at))
    : "Non disponibile";
  const fullName = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(" ");
  const details = [
    { label: "Email", value: user.email || "Non disponibile" },
    { label: "Nome completo", value: fullName || "Da completare" },
    { label: "Username", value: profile?.username || "Da impostare" },
    { label: "Membro dal", value: memberSince },
  ];
  const statusCards = [
    { label: "Stato profilo", value: profile ? "Online" : "In sync" },
    { label: "Avatar", value: profile?.avatar_url ? "Custom" : "Default" },
    { label: "Pronto per", value: "Modifiche rapide" },
  ];

  return (
    <main className="profile-shell">
      <section className="profile-panel">
        <div className="profile-hero">
          <div className="profile-hero__content">
            <span className="profile-badge mb-5">Player profile</span>
            <h1 className="profile-title">Control Room</h1>
            <p className="profile-lead">
              Tutti i dettagli del tuo account in una vista piu leggibile, con accesso rapido
              alle modifiche principali.
            </p>
            <div className="profile-action-row">
              <Link className="profile-button profile-button--primary" to={routes.profile_settings}>
                Modifica profilo
              </Link>
              <Link className="profile-button profile-button--secondary" to={routes.home}>
                Torna alla home
              </Link>
            </div>
          </div>

          <article className="profile-card profile-card--hero">
            <div className="profile-avatar-frame">
              <img
                src={avatarSource}
                alt="Avatar profilo"
                className="profile-avatar"
                onError={handleAvatarError}
              />
            </div>
            <span className="profile-chip">online identity</span>
            <h2 className="profile-name">{profile?.username || "Player one"}</h2>
            <p className="profile-subtitle">{fullName || "Nome da completare"}</p>
          </article>
        </div>

        <section className="profile-stats-grid" aria-label="Stato profilo">
          {statusCards.map((card) => (
            <article key={card.label} className="profile-stat-card">
              <span className="profile-stat-card__label">{card.label}</span>
              <strong className="profile-stat-card__value">{card.value}</strong>
            </article>
          ))}
        </section>

        <section className="profile-details-grid" aria-label="Dettagli account">
          {details.map((detail) => (
            <article key={detail.label} className="profile-detail-card">
              <span className="profile-detail-card__label">{detail.label}</span>
              <strong className="profile-detail-card__value">{detail.value}</strong>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
