import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import AddProduct from "../pages/AddProduct";
import Cart from "../pages/Cart";
import User from "../pages/User";
import SingleCategory from "../components/SingleCategory/SingleCategory";
import Product from "../../src/pages/Product";
import Contacts from "../pages/Contacts";
import Services from "../pages/Services";

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
