import styles from "./ProductsHome.module.css";
import Products from "../Products/Products";

const ProductsHome = () => {
  return (
    <section className={styles.sectionCards}>
      <h1 className={styles.cardsTitle}>Shop The Latest</h1>
      <Products />
    </section>
  );
};

export default ProductsHome;
