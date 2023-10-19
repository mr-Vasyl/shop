import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { categoriesSelector, getCategories } from "store/slice/categoriesSlice";
import { fieldsAddProduct } from "config/validate";

import styles from "./AddProduct.module.css";
import Spinner from "widgets/Spinner/Spinner";
import Error from "widgets/Error/Error";
import FormReact from "components/FormReact/FormReact";
import { postAddProduct, productsSelector } from "store/slice/productsSlice";

const AddProduct = () => {
  const [values, setValues] = useState("1");

  const dispatch = useDispatch();

  const { list } = useSelector(categoriesSelector);
  const { product, isLoading, error } = useSelector(productsSelector);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onSubmit = (reset) => (data) => {
    let body = {
      title: data.title,
      price: +data.price,
      description: data.description,
      categoryId: +values,
      images: data.images.length
        ? data.images.split(",").filter((_, indx) => indx < 3)
        : [],
    };

    dispatch(postAddProduct(body));
    reset();
  };

  const handleChange = (e) => {
    setValues(e.target.value);
  };
  const selectField = (
    <select
      name="category"
      id="category"
      value={values}
      onChange={handleChange}
    >
      {list.map(({ id, name }) => (
        <option value={id} key={id}>
          {name}
        </option>
      ))}
    </select>
  );

  if (isLoading) return <Spinner />;
  if (error) return <Error error={error} />;

  return (
    <div className={styles.products}>
      <div className={styles.title}>Create product:</div>
      <FormReact
        onSubmit={onSubmit}
        fields={fieldsAddProduct}
        btn="add product"
        selectField={selectField}
      />

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
