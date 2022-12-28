import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage } from "./container/authContainer";
import ProductsMainLayout from "./layout/MainLayout";

import {
  ABoutMePage,
  HomePage,
  ProductsPage,
  TrackOrderPage,
} from "./container/HomeContainer";
import BlogPage from "./container/HomeContainer/blogPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<ProductsMainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about-me" element={<ABoutMePage />} />
          <Route path="/tracking" element={<TrackOrderPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
