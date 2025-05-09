import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home/home";
import SearchBar from "@/pages/search/searchbar";
import Trainings from "@/pages/trainings/trainings";
import AddTraining from "@/pages/trainings/add-trainings/add-trainings";
import Sections from "@/pages/home/sections/sections";
import AddSections from "@/pages/home/sections/add-sections/add-sections";
import Categories from "@/pages/categories/categories";
import AddCategories from "@/pages/categories/add-categories/add-categories";
import Login from "./pages/login/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <SearchBar />,
  },
  {
    path: "/trainings",
    element: <Trainings />,
  },
  {
    path: "/addtrainings",
    element: <AddTraining />,
  },
  {
    path: "/sections",
    element: <Sections />,
  },
  {
    path: "/addsections",
    element: <AddSections />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/addcategories",
    element: <AddCategories />,
  },
  {
    path: "/login",
    element: <Login />
  },

]);

export default router;