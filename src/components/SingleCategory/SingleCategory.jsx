import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./SingleCategory.module.css";

import Categories from "../Categories/Categories";

import Spinner from "widgets/Spinner/Spinner";
import ProductsList from "../Products/ProductsList";
import {
  categoriesSelector,
  getRelatedProducts,
  setRelated,
} from "store/slice/categoriesSlice";

const SingleCategory = ({ initialAmount = 12 }) => {
  const [offset, setOffset] = useState(0);

  const params = useParams();
  const dispatch = useDispatch();

  const { related, isLoading } = useSelector(categoriesSelector);

  useEffect(() => {
    setOffset(0);
    dispatch(setRelated([]));
    return () => {
      dispatch(setRelated([]));
    };
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(
      getRelatedProducts({
        id: params.id,
        limit: { offset: offset, limit: initialAmount },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, initialAmount, offset]);

  const setNumb = () => {
    setOffset((numb) => numb + initialAmount);
  };

  const empty = (
    <div className={styles.isEmpty}>Products are temporarily empty</div>
  );

  return (
    <section className={styles.category}>
      <Categories />
      {isLoading && <Spinner />}
      {!related.length && empty}
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
