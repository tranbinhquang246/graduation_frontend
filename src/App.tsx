import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage } from "./container/authContainer";
import ProductsMainLayout from "./layout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ABoutMePage,
  HomePage,
  ProductsPage,
  TrackOrderPage,
} from "./container/HomeContainer";
import BlogPage from "./container/HomeContainer/blogPage";
import { ProductDetail } from "./container/productContainer";
import { CartPage } from "./container/cartContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<ProductsMainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productID" element={<ProductDetail />} />
          <Route path="/about-me" element={<ABoutMePage />} />
          <Route path="/tracking" element={<TrackOrderPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
