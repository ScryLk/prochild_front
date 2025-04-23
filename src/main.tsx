import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/home.tsx'
import SearchBar from './pages/search/searchbar.tsx'
import Trainings from './pages/trainings/trainings.tsx'
import Sections from './pages/sections/sections.tsx'
import Categories from './pages/categories/catergories.tsx'
import AddTraining from './pages/trainings/add-trainings/add-trainings.tsx'
import AddSections from './pages/sections/add-sections/add-sections.tsx'



import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddCategories from './pages/categories/add-categories/add-categories.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/search",
    element: <SearchBar />
  },
  {
    path: "/trainings",
    element: <Trainings />
  },
  {
    path: "/addtrainings",
    element: <AddTraining />
  },
  {
    path: "/sections",
    element: <Sections />
  },
  {
    path: "/addsections",
    element: <AddSections />
  },
  {
    path: "/categories",
    element: <Categories />
  },
  {
    path: "/addcategories",
    element: <AddCategories />
  }


])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
