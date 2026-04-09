import { Outlet, useLoaderData } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  const genres = useLoaderData();

  return (
    <>
      <Navbar />
      <section className="flex gap-0">
        <Sidebar genres={Array.isArray(genres) ? genres : []} />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
}
