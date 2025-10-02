import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Catalog } from "./pages/catalog";

export function App() {
  return (
    <MyRoutes />
  )
}

function MyRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" Component={Login} />
          <Route path="/login" Component={Login} />
          <Route path="/catalog" Component={Catalog} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
