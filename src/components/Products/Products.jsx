import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  getProducts,
  productsSelector,
  setProducts,
} from "store/slice/productsSlice";

import Error from "widgets/Error/Error";
import ProductsList from "./ProductsList";

const Products = ({ initialAmount = 12 }) => {
  const [offset, setOffset] = useState(0);

  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector(productsSelector);

  useEffect(() => {
    dispatch(getProducts({ offset: offset, limit: initialAmount }));
  }, [dispatch, initialAmount, offset]);

  const setNumb = () => {
    setOffset((numb) => numb + initialAmount);
  };

  useEffect(() => {
    return () => {
      dispatch(setProducts([]));
    };
  }, [dispatch]);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <ProductsList
        list={list}
        isLoading={isLoading}
        setNumb={setNumb}
        initialAmount={initialAmount}
      />
    </>
  );
};
export default Products;
