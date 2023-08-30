import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./SingleCategory.module.css";

import Categories from "components/Categories/Categories";

import Spinner from "widgets/Spinner/Spinner";
import ProductsList from "components/Products/ProductsList";
import {
  categoriesSelector,
  getRelatedProducts,
} from "store/slice/categoriesSlice";

const SingleCategory = ({ initialAmount = 12 }) => {
  const [offset, setOffset] = useState(0);

  const params = useParams();

  const dispatch = useDispatch();

  const { related, isLoading } = useSelector(categoriesSelector);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
