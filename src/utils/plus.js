export const quantityFilter = (arr, amount) =>
  arr
    .filter(({ images }) => images.length === 3)
    .filter((_, indx) => indx < amount);

export const getRandom = (arr, count) => {
  let randomArray = [];

  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    randomArray.push(randomNumber);
  }

  let newArray = arr
    .filter((item) => item.images.length === 3)
    .filter((_, indx) => randomArray.includes(indx));

  return newArray;
};

export const totalAmount = (arr) =>
  arr.reduce((sum, el) => {
    return sum + el.product.price * el.quantity;
  }, 0);
