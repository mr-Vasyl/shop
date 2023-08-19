import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { SpinnerCircular } from "spinners-react";

import styles from "./Search.module.css";
import glass from "images/glass.svg";

import {
  categoriesSelector,
  getSearchProducts,
} from "store/slice/categoriesSlice";
import useDebounce from "config/useDebounce";

const Search = () => {
  const [valueSearch, setValueSearch] = useState("");
  const amountRef = useRef(false);
  const debouncedValue = useDebounce(valueSearch, 500);

  const dispatch = useDispatch();
  const { search, isLoadingSearch } = useSelector(categoriesSelector);

  useEffect(() => {
    if (amountRef.current) {
      dispatch(getSearchProducts(valueSearch));
    }
    amountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, debouncedValue]);

  const handleSearch = (event) => {
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
          search.map(({ id, title, images }) => (
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
