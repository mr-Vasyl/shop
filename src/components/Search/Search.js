import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Search.module.css";
import glass from "../../images/glass.svg";

import { getSearchProducts } from "../../store/searchSlice";
import { SpinnerCircular } from "spinners-react";

const Search = () => {
  const [valueSearch, setValueSearch] = useState("");

  const dispatch = useDispatch();
  const { search, isLoading } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getSearchProducts(valueSearch));
  }, [dispatch, valueSearch]);

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
        {isLoading ? (
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
