import { Products } from "types/categories";
import { Cart } from "types/user";

export const getRandom = (arr: Products[], count: number): Products[] => {
  let randomArray: number[] = [];

  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    randomArray.push(randomNumber);
  }

  let newArray = arr.filter((_, indx) => randomArray.includes(indx));

  return newArray;
};

export const totalAmount = (arr: Cart[]): number =>
  arr.reduce((sum, el) => {
    return sum + el.product.price * el.quantity;
  }, 0);
