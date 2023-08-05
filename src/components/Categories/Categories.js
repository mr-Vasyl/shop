import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Categories.module.css";
import { getCategories } from "store/categoriesSlice";

function Categories({ countCategory = 6 }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { list, isLoading, isError, message } = useSelector(
    (state) => state.categories
  );

  if (isLoading) return <span>loading...</span>;

  return (
    <>
      <ul className={styles.category}>
        {isError ? (
          <span>{message}</span>
        ) : (
          list
            .filter((_, indx) => indx < countCategory)
            .map(({ id, name }) => (
              <li key={id}>
                <NavLink
                  to={`/categories/${id}`}
                  className={(navData) =>
                    navData.isActive ? styles.navLink : styles.navCat
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))
        )}
      </ul>
      <hr className={styles.line} />
    </>
  );
}
export default Categories;
