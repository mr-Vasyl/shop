import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./SingleCategory.module.css";

import Categories from "components/Categories/Categories";

import Spinner from "widgets/Spinner/Spinner";
import ProductsList from "components/Products/ProductsList";
import {
  categoriesSelector,
  getRelatedProducts,
} from "store/slice/categoriesSlice";

import { useAppDispatch, useAppSelector } from "store/hooks";

type SingleCategoryProps = {
  initialAmount?: number;
};

const SingleCategory = ({ initialAmount = 12 }: SingleCategoryProps) => {
  const [offset, setOffset] = useState<number>(0);

  const params = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const { related, isLoading } = useAppSelector(categoriesSelector);

  useEffect(() => {
    setOffset(0);
    dispatch(
      getRelatedProducts({
        categoryId: params.id,
        offset: 0,
        limit: initialAmount,
        isMount: true,
      })
    );
  }, [dispatch, params.id]);

  const setNumb = () => {
    setOffset((prevState) => prevState + initialAmount);
    dispatch(
      getRelatedProducts({
        categoryId: params.id,
        offset: offset + initialAmount,
        limit: initialAmount,
      })
    );
  };

  return (
    <section className={styles.category}>
      <Categories />
      {isLoading && <Spinner />}
      <ProductsList
        isLoading={isLoading}
        list={related}
        setNumb={setNumb}
        initialAmount={initialAmount}
      />
    </section>
  );
};
export default SingleCategory;
