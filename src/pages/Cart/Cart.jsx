import { useDispatch, useSelector } from "react-redux";
import { totalAmount } from "utils/plus";
import {
  changeQuantityProduct,
  removeProductCart,
  usersSelector,
} from "store/userSlice/userSlice";

import styles from "./Cart.module.css";
import cartIcon from "images/cart.svg";

const Cart = () => {
  const dispatch = useDispatch();

  const { cart } = useSelector(usersSelector);
  const total = totalAmount(cart);

  const removeProduct = (id) => {
    dispatch(removeProductCart(id));
  };
  const changeQuantity = (product, quantity) => {
    dispatch(changeQuantityProduct({ product, quantity }));
  };

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your Shopping Cart</h2>
      <div className={styles.wrapper}>
        {cart.map((item) => (
          <div className={styles.list} key={item.product.id}>
            <img src={item.product.images[0]} alt="" className={styles.img} />
            <div className={styles.name}>{item.product.title}</div>
            <div className={styles.price}>${item.product.price}</div>
            <div className={styles.quantity}>
              <button
                className={styles.btn}
                onClick={() =>
                  changeQuantity(item.product, Math.max(1, item.quantity + 1))
                }
              >
                +
              </button>
              <span className={styles.sum}>{item.quantity}</span>
              <button
                className={styles.btn}
                onClick={() =>
                  changeQuantity(item.product, Math.max(1, item.quantity - 1))
                }
              >
                -
              </button>
            </div>
            <div className={styles.TotalSum}>
              ${item.product.price * item.quantity}
            </div>
            <button
              onClick={() => removeProduct(item.product.id)}
              className={styles.del}
            >
              ✘
            </button>
          </div>
        ))}

        {!cart.length ? (
          <div className={styles.wrapperCart}>
            <div className={styles.contentCart}>
              <img src={cartIcon} alt="cartIcon" />
              <span className={styles.empty}> is Empty!</span>
            </div>
          </div>
        ) : (
          <div className={styles.total}>
            <div>
              Total price: <span>${total}</span>
            </div>
            <button className={styles.cartBtn}>checkout</button>
          </div>
        )}
      </div>
    </section>
  );
};
export default Cart;
