import { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { categoriesSelector, getCategories } from "store/slice/categoriesSlice";
import { fieldsAddProduct } from "config/validate";

import styles from "./AddProduct.module.css";
import Spinner from "widgets/Spinner/Spinner";
import Error from "widgets/Error/Error";
import FormReact from "components/FormReact/FormReact";
import { postAddProduct, productsSelector } from "store/slice/productsSlice";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { NewProduct } from "store/types/products";
import { Categories } from "store/types/categories";

const AddProduct = () => {
  const [values, setValues] = useState<string>("1");

  const dispatch = useAppDispatch();

  const { list } = useAppSelector(categoriesSelector);
  const { product, isLoading, error } = useAppSelector(productsSelector);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onSubmit = (reset: () => void) => (data?: NewProduct) => {
    if (data) {
      let img: string[] = Array.isArray(data.images)
        ? data.images
        : data.images.split(",");

      let body: NewProduct = {
        title: data.title,
        price: +data.price,
        description: data.description,
        categoryId: +values,
        images: img.slice(0, 3),
      };

      dispatch(postAddProduct(body));
    }
    reset();
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValues(e.target.value);
  };
  const selectField = (
    <select
      name="category"
      id="category"
      value={values}
      onChange={handleChange}
    >
      {list.map(({ id, name }: Categories) => (
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

      {product && Object.keys(product).length > 0 && (
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
