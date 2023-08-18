import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCart } from "store/slice/userSlice";
import styles from "./Product.module.css";

import Back from "widgets/Back/Back";
import Socials from "components/Socials/Socials";
import Spinner from "widgets/Spinner/Spinner";
import Error from "widgets/Error/Error";
import { getProduct, productsSelector } from "store/slice/productsSlice";

const Product = () => {
  const navigate = useNavigate();
  const [imageCurrent, setCurrentImage] = useState("");
  const [toProductCart, setToProductCart] = useState(false);

  const params = useParams();

  const dispatch = useDispatch();

  const { oneProduct, isLoading, error } = useSelector(productsSelector);

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (oneProduct?.images && oneProduct.images.length > 0) {
      setCurrentImage(oneProduct.images[0]);
    }
  }, [oneProduct]);

  const addToCart = () => {
    dispatch(getCart(oneProduct));
    setToProductCart((e) => !e);
  };
  const ToCart = () => {
    navigate("/cart");
  };

  if (isLoading) return <Spinner />;
  if (error) return <Error error={error} />;

  return (
    oneProduct && (
      <section className={styles.section}>
        <div className={styles.product}>
          <div className={styles.images}>
            <div className={styles.imagesItem}>
              {oneProduct.images.map((image, i) => (
                <div
                  key={i}
                  className={styles.img}
                  style={{ backgroundImage: `url(${image})` }}
                  onClick={() => setCurrentImage(image)}
                />
              ))}
            </div>
            <img src={imageCurrent} className={styles.mainImg} alt="" />
          </div>

          <div className={styles.content}>
            <div className={styles.title}>{oneProduct.title}</div>
            <div className={styles.price}>$ {oneProduct.price}</div>
            <div className={styles.category}>
              Category:{" "}
              <Link
                to={`/categories/${oneProduct.category.id}`}
                className={styles.productLink}
              >
                {oneProduct.category.name}
              </Link>
            </div>

            <div className={styles.socials}>
              <Socials />
            </div>
            {toProductCart ? (
              <button className={"btn"} onClick={ToCart}>
                view cart
              </button>
            ) : (
              <button className={"btn"} onClick={addToCart}>
                add to cart
              </button>
            )}
          </div>
        </div>
        <div className={styles.desc}>
          <h4>Description:</h4>
          <p>{oneProduct.description}</p>
        </div>
        <div className={styles.back}>
          <Back />
        </div>
      </section>
    )
  );
};
export default Product;
