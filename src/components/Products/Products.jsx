import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  getProducts,
  productsSelector,
} from "store/productsSlice/productsSlice";

import Spinner from "widgets/Spinner/Spinner";
import Error from "widgets/Error/Error";
import ProductsList from "./ProductsList";

const Products = () => {
  const dispatch = useDispatch();

  const { list, isLoading, isError } = useSelector(productsSelector);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error isError={isError} />;
  }

  return <ProductsList list={list} isLoading={isLoading} />;
};
export default Products;
