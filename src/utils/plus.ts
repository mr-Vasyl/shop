import { Products } from "store/types/categories";
import { Cart } from "store/types/user";

export const getRandom = (arr: Products[], count: number): Products[] => {
  let randomArray: number[] = [];

  for (let i = 0; i < count; i++) {
    const randomNumber: number = Math.floor(Math.random() * 10);
    randomArray.push(randomNumber);
  }

  let newArray = arr.filter((_, indx: number) => randomArray.includes(indx));

  return newArray;
};

export const totalAmount = (arr: Cart[]): number =>
  arr.reduce((sum: number, el: Cart) => {
    return sum + el.product.price * el.quantity;
  }, 0);
