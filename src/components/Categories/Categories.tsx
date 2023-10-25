import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Categories.module.css";

import { categoriesSelector, getCategories } from "store/slice/categoriesSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

function Categories({ countCategory = 5 }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { list, isLoadingRelated, error } = useAppSelector(categoriesSelector);

  if (isLoadingRelated) return <span>loading...</span>;

  return (
    <>
      <ul className={styles.category}>
        {error ? (
          <span>{error}</span>
        ) : (
          list
            .filter((_, indx: number) => indx < countCategory)
            .map(({ id, name }: { id: string; name: string }) => (
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
