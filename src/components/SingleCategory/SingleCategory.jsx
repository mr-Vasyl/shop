import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./SingleCategory.module.css";

import Categories from "../Categories/Categories";

import {
  getRelatedProducts,
  productsSelector,
} from "store/productsSlice/productsSlice";
import Spinner from "widgets/Spinner/Spinner";
import ProductsList from "../Products/ProductsList";

const SingleCategory = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { related, isLoading } = useSelector(productsSelector);

  useEffect(() => {
    dispatch(getRelatedProducts(params.id));
  }, [dispatch, params.id]);

  return (
    <section className={styles.category}>
      <Categories />
      {isLoading && <Spinner />}
      <ProductsList list={related} id={params.id} />
    </section>
  );
};
export default SingleCategory;
