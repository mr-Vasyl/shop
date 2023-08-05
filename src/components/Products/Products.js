import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getProducts } from "store/productsSlice";

import Spinner from "widgets/Spinner";
import Error from "widgets/Error";
import ProductsList from "./ProductsList";

const Products = () => {
  const dispatch = useDispatch();

  const { list, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError && message) {
    return <Error message={message} />;
  }

  return <ProductsList list={list} isLoading={isLoading} />;
};
export default Products;
