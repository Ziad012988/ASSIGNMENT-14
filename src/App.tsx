import "./App.css";
import Home from "./conponants/Home/Home";
import Blog from "./conponants/blog/Blog";
import About from "./conponants/About Us/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import NotFound from "./conponants/NotFound/NotFound";
import { BlogPostRoute } from "./conponants/Home/BlogPost";
import FooterLegalPage from "./conponants/Footer/FooterLegalPage";

const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogPostRoute /> },
      { path: "about", element: <About /> },
      { path: "legal/:page", element: <FooterLegalPage /> },
      { index: true, element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
