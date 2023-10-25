import { NavLink } from "react-router-dom";
import { routes } from "config/routes";

import styles from "./Header.module.css";
import Search from "../Search/Search";
import { getLogOut, usersSelector } from "store/slice/userSlice";

import logo from "images/shopCart.svg";
import cartIcon from "images/cart.svg";
import userIcon from "images/userIcon.svg";

import { useAppDispatch, useAppSelector } from "store/hooks";

const Header = () => {
  const dispatch = useAppDispatch();

  const { currentUser, cart } = useAppSelector(usersSelector);

  const getOut = () => dispatch(getLogOut());

  const iconUser = (
    <NavLink to={routes.user} className={styles.wrap}>
      <div
        style={{ backgroundImage: `url(${currentUser?.avatar})` }}
        className={styles.iconUser}
      />
    </NavLink>
  );

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.navbar}>
          <NavLink to={routes.home}>
            <img src={logo} alt="shoppe" />
          </NavLink>
          <div className={styles.search}>
            <Search />
          </div>
          <div className={styles.wrapper}>
            <ul className={styles.navMain}>
              <li>
                <NavLink
                  to={routes.shop}
                  className={(navData) =>
                    navData.isActive ? styles.navLink : ""
                  }
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={routes.addProduct}
                  className={(navData) =>
                    navData.isActive ? styles.navLink : ""
                  }
                >
                  Add Product
                </NavLink>
              </li>
            </ul>
            <div className={styles.line}></div>
            <div className={styles.navUser}>
              <NavLink
                to={routes.cart}
                className={(navData) =>
                  navData.isActive ? styles.navLink : styles.cartContainer
                }
              >
                <div>
                  <img src={cartIcon} alt="shopping-cart" />
                </div>
                {cart.length > 0 && (
                  <span className={styles.shoppingCart}>{cart.length}</span>
                )}
              </NavLink>

              {currentUser ? (
                iconUser
              ) : (
                <NavLink
                  to={routes.user}
                  className={(navData) =>
                    navData.isActive ? styles.navLink : ""
                  }
                >
                  <div>
                    <img src={userIcon} alt="user-icon" />
                  </div>
                </NavLink>
              )}
              {currentUser && (
                <button className={styles.logOut} onClick={getOut}>
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
