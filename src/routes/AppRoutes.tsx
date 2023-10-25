import { Route, Routes } from "react-router-dom";
import { routes } from "config/routes";
import { lazy } from "react";

const Home = lazy(() => import("pages/Home/Home"));
const Shop = lazy(() => import("pages/Shop/Shop"));
const AddProduct = lazy(() => import("pages/AddProduct/AddProduct"));
const Cart = lazy(() => import("pages/Cart/Cart"));
const User = lazy(() => import("pages/User/User"));
const SingleCategory = lazy(
  () => import("pages/SingleCategory/SingleCategory")
);
const Product = lazy(() => import("pages/Product/Product"));
const Contacts = lazy(() => import("pages/Contacts/Contacts"));
const Services = lazy(() => import("pages/Services/Services"));

const AppRoutes = () => (
  <Routes>
    <Route path={routes.home} element={<Home />} />
    <Route path={routes.shop} element={<Shop />} />
    <Route path={routes.addProduct} element={<AddProduct />} />
    <Route path={routes.cart} element={<Cart />} />
    <Route path={routes.user} element={<User />} />
    <Route path={routes.product} element={<Product />} />
    <Route path={routes.category} element={<SingleCategory />} />
    <Route path={routes.contacts} element={<Contacts />} />
    <Route path={routes.services} element={<Services />} />
  </Routes>
);

export default AppRoutes;
