export const quantityFilter = (arr) =>
  arr.filter(({ images }) => images.length <= 3);

export const getRandom = (arr, count) => {
  let randomArray = [];

  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    randomArray.push(randomNumber);
  }

  let newArray = arr.filter((_, indx) => randomArray.includes(indx));

  return newArray;
};

export const totalAmount = (arr) =>
  arr.reduce((sum, el) => {
    return sum + el.product.price * el.quantity;
  }, 0);
