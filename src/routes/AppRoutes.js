import { Route, Routes } from "react-router-dom";
import { routes } from "utils/routes";

import Home from "pages/Home/Home";
import Shop from "pages/Shop/Shop";
import AddProduct from "pages/AddProduct/AddProduct";
import Cart from "pages/Cart/Cart";
import User from "pages/User/User";
import SingleCategory from "components/SingleCategory/SingleCategory";
import Product from "pages/Product/Product";
import Contacts from "pages/Contacts/Contacts";
import Services from "pages/Services/Services";

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
