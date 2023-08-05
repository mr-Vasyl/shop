import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

import styles from "./ProductsList.module.css";
import { quantityFilter } from "utils/plus";

function ProductsList({ list, products = [], initialAmount = 12 }) {
  const [count, setCount] = useState(initialAmount);
  const [initialToggle, setInitialToggle] = useState(true);

  products = quantityFilter(list, count);

  const setNumb = () => {
    setCount((numb) => numb + initialAmount);
  };

  useEffect(() => {
    if (count > list.length) {
      setInitialToggle((bool) => !bool);
    }
  }, [count, list.length]);

  useEffect(() => {
    setCount(initialAmount);
  }, [initialAmount]);

  if (list.length < 1) {
    return <div className={styles.isEmpty}>Category is empty</div>;
  }
  if (products.length < 1) {
    return <div className={styles.isEmpty}>Products are temporarily empty</div>;
  }
  return (
    <div className={styles.wrapper}>
      <ul className={styles.cardsList}>
        {products.map(({ id, title, images, price }) => (
          <Link to={`/products/${id}`} className={styles.cardsItem} key={id}>
            <div
              style={{ backgroundImage: `url(${images[0]})` }}
              className={styles.image}
            />
            <div className={styles.cardName}>{title}</div>
            <div className={styles.cardPrise}>$ {price}</div>
          </Link>
        ))}
      </ul>
      <div className={styles.enter}>
        {list.length > 0 && initialToggle && (
          <button className={styles.more} onClick={setNumb}>
            See More
          </button>
        )}
      </div>
    </div>
  );
}
ProductsList.propTypes = {
  list: PropTypes.array,
};
export default ProductsList;
