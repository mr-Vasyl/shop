import React, { useEffect, useState } from "react";
import { getFilterByPriceRangeProducts } from "store/searchSlice";
import { useDispatch, useSelector } from "react-redux";

import styles from "./FilterByPriceRange.module.css";
import { setProductRange } from "store/productsSlice";

function FilterByPriceRange() {
  const [filterRange, setFilterRange] = useState({ min: "", max: "" });

  const selector = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const minValue = Number(filterRange.min) < 1 ? 1 : filterRange.min;

    dispatch(
      getFilterByPriceRangeProducts({
        min: minValue,
        max: filterRange.max,
      })
    );
  }, [dispatch, filterRange]);

  function handleChange(e) {
    setFilterRange({
      ...filterRange,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    const data = selector.search.length > 0;
    if (!data) return;

    dispatch(setProductRange(selector.search));
  }, [dispatch, selector.search]);

  return (
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
  );
}

export default FilterByPriceRange;
