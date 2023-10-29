import { NavLink } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./SliderProducts.module.css";

import Spinner from "widgets/Spinner/Spinner";
import Error from "widgets/Error/Error";
import { getRandom } from "utils/plus";
import { productsSelector } from "store/slice/productsSlice";

import { settings } from "config/slider";

import { useAppSelector } from "store/hooks";
import { Products } from "types/categories";

type SliderProductsProps = {
  product: Products[];
  initialAmount: number;
};

const SliderProducts = ({ product, initialAmount }: SliderProductsProps) => {
  const { list, isLoading, error } = useAppSelector(productsSelector);

  if (list.length) {
    product = getRandom(list, initialAmount);
  }

  if (isLoading) return <Spinner />;

  if (error) return <Error error={error} />;

  return (
    <div className={styles.content}>
      <Slider {...settings}>
        {product.length &&
          product.map((item) => (
            <div className={styles.card} key={item.id}>
              <div className={styles.cardTop}>
                <img src={item.images[0]} alt={item.title} />
              </div>

              <div className={styles.cardBottom}>
                <h1>{item.title.slice(0, 50)}</h1>
                <h3>$ {item.price}</h3>
                <div className={styles.category}>
                  Category: {item.category.name}
                </div>

                <NavLink to={`/products/${item.id}`} className={styles.link}>
                  <button className={styles.linkBtn}>more</button>
                </NavLink>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};
export default SliderProducts;
