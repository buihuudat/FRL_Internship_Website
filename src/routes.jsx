import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import AdminLayout from "./components/layout/AdminLayout";
import Users from "./pages/admin/Users";
import Jobs from "./pages/admin/Jobs";
import Company from "./pages/admin/Company";
import CompanyPage from "./pages/Company";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/:name",
        index: true,
        element: <Home />,
      },

      {
        path: "/company/:id",
        index: true,
        element: <CompanyPage />,
      },
      {
        path: "/dang-nhap",
        element: <Login />,
      },
      {
        path: "/dang-ky",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/tai-khoan",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/jobs",
        element: <Jobs />,
      },
      {
        path: "/admin/company",
        element: <Company />,
      },
    ],
  },
]);
