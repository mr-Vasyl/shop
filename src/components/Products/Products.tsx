import { useEffect, useState } from "react";
import { getProducts, productsSelector } from "store/slice/productsSlice";

import Error from "widgets/Error/Error";
import ProductsList from "./ProductsList";

import { useAppDispatch, useAppSelector } from "store/hooks";

type ProductsProps = {
  initialAmount?: number;
};
const Products = ({ initialAmount = 12 }: ProductsProps) => {
  const [offset, setOffset] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { list, isLoading, error } = useAppSelector(productsSelector);

  useEffect(() => {
    dispatch(
      getProducts({ offset: offset, limit: initialAmount, isMount: true })
    );
  }, [dispatch]);

  const setNumb = () => {
    setOffset((numb) => numb + initialAmount);
    dispatch(
      getProducts({ offset: offset + initialAmount, limit: initialAmount })
    );
  };

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
