import Categories from "components/Categories/Categories";
import FilterByPriceRange from "components/FilterByPriceRange/FilterByPriceRange";
import Products from "components/Products/Products";

import styles from "./Shop.module.css";

const Shop = () => {
  return (
    <div className={styles.products}>
      <Categories />
      <FilterByPriceRange />
      <Products />
    </div>
  );
};

export default Shop;
