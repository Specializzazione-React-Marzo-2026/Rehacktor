import GameCard from "./GameCard";

export default function Gamelist({ children }) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
}

Gamelist.Card = GameCard;