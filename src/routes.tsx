import { createBrowserRouter } from "react-router-dom";
import { GlobalError } from "@/components/error/global-error.tsx";
import MainLayout from "@/layouts/main-layout";
import MainPage from "@/pages/main-page/index.tsx";
import AboutPage from "@/pages/about-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainPage />, errorElement: <GlobalError /> },
      { path: "/about", element: <AboutPage />, errorElement: <GlobalError /> },
    ],
    errorElement: <GlobalError />,
  },
]);
