import { FaBeer } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="border-t border-[#fef08a]/10 bg-[#050a15] py-6 mt-8">
          <p className="text-sm text-center text-[#94a3b8]">
            Made with <FaBeer className="inline text-[#facc15]" /> by Alex
          </p>
      </footer>
    </>
  );
}
