import { useEffect, useRef, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { SpinnerCircular } from "spinners-react";

import styles from "./Search.module.css";
import glass from "images/glass.svg";

import {
  categoriesSelector,
  getSearchProducts,
} from "store/slice/categoriesSlice";
import useDebounce from "hoc/useDebounce";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { Products } from "store/types/categories";

const Search = () => {
  const [valueSearch, setValueSearch] = useState<string>("");
  const amountRef = useRef<boolean>(false);

  const debouncedValue = useDebounce(valueSearch, 500);

  const dispatch = useAppDispatch();

  const { search, isLoadingSearch } = useAppSelector(categoriesSelector);

  useEffect(() => {
    if (amountRef?.current) {
      dispatch(getSearchProducts(valueSearch));
    }
    amountRef.current = true;
  }, [dispatch, debouncedValue]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target.value);
  };

  const clearInput = () => {
    setValueSearch("");
  };

  return (
    <div className={styles.search}>
      <img className={styles.glass2} alt="glass" src={glass} />
      <input
        className={styles.input}
        type="text"
        name="search"
        placeholder="Search..."
        autoComplete="off"
        onChange={handleSearch}
        value={valueSearch}
      />
      {valueSearch && (
        <div className={styles.del} onClick={clearInput}>
          ✘
        </div>
      )}
      <div
        className={`${valueSearch.length > 0 ? styles.content : styles.none}`}
      >
        {isLoadingSearch ? (
          <SpinnerCircular size={30} />
        ) : !search.length ? (
          "No results"
        ) : (
          search.map(({ id, title, images }: Products) => (
            <Link
              to={`/products/${id}`}
              className={styles.item}
              key={id}
              onClick={() => setValueSearch("")}
            >
              <div
                style={{ backgroundImage: `url(${images[0]})` }}
                className={styles.image}
              />
              <div className={styles.cardName}>{title}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
export default Search;
