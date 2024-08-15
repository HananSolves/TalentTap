// Modules
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Jobs from "./pages/Jobs.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import JobPage from "./pages/JobPage.jsx";
import EditJobPage from "./pages/EditJobPage.jsx";
import AddJobPage from "./pages/AddJobPage.jsx";

// Components

// Layout
import MainLayout from "./layouts/MainLayout.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='jobs' element={<Jobs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/jobs/:title' element={<JobPage />} />
        <Route path='/jobs/:title/edit-job' element={<EditJobPage />} />
        <Route path='/add-job' element={<AddJobPage />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
