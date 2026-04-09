import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import routes from "./routes";
import Homepage from "../views/Homepage";
import Searchpage from "../views/Searchpage";
import { getAllGenres, getAllGamesLoader, getSearchedGames,getFilteredbyGenreGames } from "./loader";

const router = createBrowserRouter([
  {
    path: routes.home,
    Component: Layout,
    loader: getAllGenres,
    children: [
      {
        path: routes.home,
        Component: Homepage,
        loader: getAllGamesLoader,
        hydrateFallbackElement: (
          <div className=" loading_page">
            <div className="loading_spinner"></div>
          </div>
        ),
      },
      {
        path: routes.search,
        Component: Searchpage,
        loader: getSearchedGames,
        hydrateFallbackElement: (
          <div className=" loading_page ">
            <div className="loading_spinner"></div>
          </div>
        ),
      },
      {
        path: routes.genre,
        Component: Searchpage,
        loader: getFilteredbyGenreGames,
        hydrateFallbackElement: (
          <div className=" loading_page ">
            <div className="loading_spinner"></div>
          </div>
        ),
      },
    ],
  },
]);

export default router;
