import SliderProducts from "../components/SliderProducts/SliderProducts";
import ProductsHome from "../components/ProductsHome/ProductsHome";
import ScrollToTop from "../widgets/ScrollToTop";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.main}>
      <SliderProducts />
      <ProductsHome />
      <ScrollToTop />
    </div>
  );
};
export default Home;
