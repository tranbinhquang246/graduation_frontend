import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage } from "./container/authContainer";
import ProductsMainLayout from "./layout/ProductsMainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<ProductsMainLayout />}>
          {/* <Route index element={<Products />} />
          <Route path="/product/:productID" element={<DetailProduct />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
