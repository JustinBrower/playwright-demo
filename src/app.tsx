import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Catalog } from "./pages/catalog";
import { Orders } from "./pages/orders";

export function App() {
  return (
    <>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </>
  )
}

function MyRoutes() {
  return (
    <>
      <Routes>
        <Route path="*" Component={Login} />
        <Route path="/login" Component={Login} />
        <Route path="/catalog" Component={Catalog} />
        <Route path="/orders" Component={Orders} />
      </Routes>
    </>
  );
}
