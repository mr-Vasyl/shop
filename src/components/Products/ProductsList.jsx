import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./ProductsList.module.css";
import Spinner from "widgets/Spinner/Spinner";

function ProductsList({ list, setNumb, initialAmount, isLoading }) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.cardsList}>
        {list.map(({ id, title, images, price }) => (
          <Link to={`/products/${id}`} className={styles.cardsItem} key={id}>
            <div
              style={{ backgroundImage: `url(${images[0]})` }}
              className={styles.image}
            />
            <div className={styles.cardName}>{title}</div>
            <div className={styles.cardPrice}>$ {price}</div>
          </Link>
        ))}
      </ul>
      <div className={styles.enter}>
        {isLoading ? (
          <Spinner />
        ) : list.length === 0 ? (
          <p>Not found list</p>
        ) : (
          list.length % initialAmount === 0 && (
            <button className={styles.more} onClick={setNumb}>
              Load More
            </button>
          )
        )}
      </div>
    </div>
  );
}
ProductsList.propTypes = {
  list: PropTypes.array,
};
export default ProductsList;
