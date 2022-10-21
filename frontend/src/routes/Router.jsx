import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "../pages/CartPage.jsx/CartPage";
import HomePage from "../pages/HomePage.jsx/HomePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
