import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getCategories } from "../store/categoriesSlice";
import { postAddProduct } from "../store/addProductSlice";

import {
  blurHandlerAddProduct,
  validateFormAddProduct,
} from "../utils/validate";

import styles from "./AddProduct.module.css";
import Spinner from "./../widgets/Spinner";
import Error from "./../widgets/Error";

const AddProduct = () => {
  const [body, setBody] = useState({});
  const [values, setValues] = useState({
    title: "",
    price: "",
    description: "",
    category: "1",
    images: "",
  });

  const [titleErrors, setTitleErrors] = useState(false);
  const [priceErrors, setPriceErrors] = useState(false);
  const [descriptionErrors, setDescriptionErrors] = useState(false);
  const [imagesErrors, setImagesErrors] = useState(false);
  const [formErrors, setFormErrors] = useState({
    title: "",
    price: "",
    description: "",
    images: "",
  });

  const dispatch = useDispatch();

  const { list } = useSelector((state) => state.categories);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.addProduct
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(postAddProduct(body));
  }, [body, dispatch]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onblurHandler = (e) => {
    blurHandlerAddProduct(
      e,
      setTitleErrors,
      setPriceErrors,
      setDescriptionErrors,
      setImagesErrors,
      values
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateFormAddProduct(values, setFormErrors);
    if (!isValid) return;

    let item = {
      title: values.title,
      price: +values.price,
      description: values.description,
      categoryId: +values.category || 1,
      images: values.images.length
        ? values.images.split(",").filter((_, indx) => indx < 3)
        : [],
    };

    setBody(item);

    setValues({
      title: "",
      price: "",
      description: "",
      category: "1",
      images: "",
    });

    setFormErrors({
      title: "",
      price: "",
      description: "",
      category: "1",
      images: "",
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.products}>
      <div className={styles.title}>Create product:</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            autoComplete="off"
            placeholder="Title:"
            onBlur={onblurHandler}
            onChange={handleChange}
            className={titleErrors ? styles["error"] : styles["inp"]}
          />
          {formErrors.title && (
            <div className={styles.errorMessage}>{formErrors.title}</div>
          )}
        </div>
        <div className={styles.group}>
          <input
            type="number"
            id="price"
            name="price"
            value={values.price}
            autoComplete="off"
            placeholder="Price:"
            onBlur={onblurHandler}
            onChange={handleChange}
            className={priceErrors ? styles["error"] : styles["inp"]}
          />
          {formErrors.price && (
            <div className={styles.errorMessage}>{formErrors.price}</div>
          )}
        </div>
        <div className={styles.group}>
          <input
            type="text"
            name="description"
            id="description"
            value={values.description}
            autoComplete="off"
            placeholder="Description:"
            onBlur={onblurHandler}
            onChange={handleChange}
            className={descriptionErrors ? styles["error"] : styles["inp"]}
          />
          {formErrors.description && (
            <div className={styles.errorMessage}>{formErrors.description}</div>
          )}
        </div>
        <div className={styles.group}>
          <select
            name="category"
            id="category"
            value={values.category}
            onChange={handleChange}
          >
            {list.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          <input
            type="text"
            id="images"
            name="images"
            value={values.images}
            autoComplete="off"
            placeholder="Link to Images (link,link...):"
            onBlur={onblurHandler}
            onChange={handleChange}
            className={imagesErrors ? styles["error"] : styles["inp"]}
          />
          {formErrors.images && (
            <div className={styles.errorMessage}>{formErrors.images}</div>
          )}
        </div>
        <button className="btn" type="submit">
          add product
        </button>
        {/*  {isError && (
          <Error message={message} content={"Refresh and try again"} />
        )} */}
      </form>

      {Object.keys(product).length > 0 && (
        <div className={styles.added} key={product.id}>
          <p>Last added</p>
          <Link to={`/products/${product.id}`} className={styles.content}>
            <div
              style={{ backgroundImage: `url(${product.images[0]})` }}
              className={styles.image}
            />
            <div>{product.title}</div>
            <div className={styles.price}>${product.price}</div>
          </Link>
        </div>
      )}
    </div>
  );
};
export default AddProduct;
