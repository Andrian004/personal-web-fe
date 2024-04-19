import { createBrowserRouter } from "react-router-dom";
import { GlobalError } from "@/components/error/global-error.tsx";
import MainLayout from "@/layouts/main-layout";
import MainPage from "@/pages/main-page/index.tsx";
import ProjectsPage from "@/pages/projects-page";
import ContactPage from "@/pages/contact-page";
import ThemesPage from "@/pages/themes-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainPage />, errorElement: <GlobalError /> },
      {
        path: "projects",
        element: <ProjectsPage />,
        errorElement: <GlobalError />,
      },
      {
        path: "contact",
        element: <ContactPage />,
        errorElement: <GlobalError />,
      },
      {
        path: "themes",
        element: <ThemesPage />,
        errorElement: <GlobalError />,
      },
    ],
    errorElement: <GlobalError />,
  },
]);
