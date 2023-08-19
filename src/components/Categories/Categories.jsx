import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Categories.module.css";
import { categoriesSelector, getCategories } from "store/slice/categoriesSlice";

function Categories({ countCategory = 5 }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { list, isLoadingRelated, error } = useSelector(categoriesSelector);

  if (isLoadingRelated) return <span>loading...</span>;

  return (
    <>
      <ul className={styles.category}>
        {error ? (
          <span>{error}</span>
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
