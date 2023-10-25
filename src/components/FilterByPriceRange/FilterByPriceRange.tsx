import { ChangeEvent, useEffect, useState } from "react";

import styles from "./FilterByPriceRange.module.css";
import {
  getFilteredProducts,
  productsSelector,
  setProducts,
} from "store/slice/productsSlice";
import ProductsList from "components/Products/ProductsList";

import { useAppDispatch, useAppSelector } from "store/hooks";

function FilterByPriceRange({ initialAmount = 12 }) {
  const [offset, setOffset] = useState<number>(initialAmount);
  const [filterRange, setFilterRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const dispatch = useAppDispatch();
  const { filteredList, isLoadingFilter } = useAppSelector(productsSelector);

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

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFilterRange({
      ...filterRange,
      [e.target.name]: parseInt(e.target.value, 10),
    });
  }

  const setNumb = () => {
    setOffset((numb: number) => numb + initialAmount);
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
