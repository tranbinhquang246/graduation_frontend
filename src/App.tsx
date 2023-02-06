import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import {
  AccountPage,
  EditAccount,
  EditAddressDelivery,
  Favorite,
  Ordered,
} from "./container/accountContainer";
import AdminLayout from "./layout/AdminLayout";
import {
  BannerManagerPage,
  CollectionUsersManagerPage,
  LockupDataManagerPage,
  OrdersManagerPage,
  ProductsManagerPage,
  UserManagerPage,
} from "./container/AdminContainer";
import ErrorLayout from "./layout/ErrorLayout";
import { withAuthAdmin } from "./service/withAuthAdminHOC";

function App() {
  const AdminLayoutWithAuth = withAuthAdmin(AdminLayout);
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
          <Route path="/account" element={<AccountPage />}>
            <Route index element={<EditAccount />} />
            <Route path="edit-address" element={<EditAddressDelivery />} />
            <Route path="ordered" element={<Ordered />} />
            <Route path="favorite" element={<Favorite />} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminLayoutWithAuth />}>
          <Route index element={<UserManagerPage />} />
          <Route path="products" element={<ProductsManagerPage />} />
          <Route path="orders" element={<OrdersManagerPage />} />
          <Route path="lookup-data" element={<LockupDataManagerPage />} />
          <Route
            path="collection-users"
            element={<CollectionUsersManagerPage />}
          />
          <Route path="banner" element={<BannerManagerPage />} />
        </Route>
        <Route path="*" element={<ErrorLayout />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
