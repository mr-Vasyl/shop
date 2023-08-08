import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Categories.module.css";
import {
  categoriesSelector,
  getCategories,
} from "store/categoriesSlice/categoriesSlice";

function Categories({ countCategory = 6 }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { list, isLoading, isError } = useSelector(categoriesSelector);

  if (isLoading) return <span>loading...</span>;

  return (
    <>
      <ul className={styles.category}>
        {isError ? (
          <span>{isError}</span>
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
