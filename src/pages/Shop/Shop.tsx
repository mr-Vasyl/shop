import Categories from "components/Categories/Categories";
import FilterByPriceRange from "components/FilterByPriceRange/FilterByPriceRange";

import styles from "./Shop.module.css";

const Shop = () => {
  return (
    <div className={styles.products}>
      <Categories />
      <FilterByPriceRange />
    </div>
  );
};

export default Shop;
