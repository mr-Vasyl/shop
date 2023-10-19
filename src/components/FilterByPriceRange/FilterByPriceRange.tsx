import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./FilterByPriceRange.module.css";
import {
  getFilteredProducts,
  productsSelector,
  setProducts,
} from "store/slice/productsSlice";
import ProductsList from "components/Products/ProductsList";

function FilterByPriceRange({ initialAmount = 12 }) {
  const [offset, setOffset] = useState(initialAmount);
  const [filterRange, setFilterRange] = useState({ min: "", max: "" });

  const { filteredList, isLoadingFilter } = useSelector(productsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const minValue = Number(filterRange.min) < 1 ? 1 : filterRange.min;

    dispatch(
      getFilteredProducts({
        price_min: minValue,
        price_max: filterRange.max,
        offset: 0,
        limit: offset,
      })
    );
  }, [dispatch, filterRange, initialAmount, offset]);

  useEffect(() => {
    return () => {
      dispatch(setProducts([]));
    };
  }, [dispatch]);

  function handleChange(e) {
    setFilterRange({
      ...filterRange,
      [e.target.name]: e.target.value,
    });
  }

  const setNumb = () => {
    setOffset((numb) => numb + initialAmount);
  };

  return (
    <>
      <div className={styles.contentFilter}>
        <input
          type="number"
          placeholder="price_min:"
          name="min"
          value={filterRange.min}
          autoComplete="on"
          onChange={handleChange}
          className={styles.inputFilter}
        />
        <input
          type="number"
          placeholder="price_max:"
          name="max"
          value={filterRange.max}
          autoComplete="on"
          onChange={handleChange}
          className={styles.inputFilter}
        />
      </div>
      <ProductsList
        isLoading={isLoadingFilter}
        list={filteredList}
        setNumb={setNumb}
        initialAmount={initialAmount}
      />
    </>
  );
}

export default FilterByPriceRange;
