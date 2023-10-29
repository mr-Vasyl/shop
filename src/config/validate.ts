import { User } from "types/user";
import { NewProduct } from "types/products";
import { Path } from "react-hook-form";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const linkRegex: RegExp = /^https:\/\/.*\.(jpg|png)$/i;

export interface FormField<T> {
  type: string;
  name: Path<T>;
  placeholder: string;
  required: string;
  minLength?: number;
  errorMessage?: string;
  min?: number;
  pattern?: {
    value: RegExp;
    message: string;
  };
  select?: boolean;
}

export const fieldsRegister: FormField<User>[] = [
  {
    type: "text",
    name: "name",
    placeholder: "Your name:",
    required: "field is empty",
    minLength: 3,
  },
  {
    type: "email",
    name: "email",
    placeholder: "Your email:",
    required: "field is empty",
    pattern: {
      value: emailRegex,
      message: `Invalid email format`,
    },
  },
  {
    type: "password",
    name: "password",
    placeholder: "Your password:",
    required: "field is empty",
    minLength: 6,
  },
  {
    type: "text",
    name: "avatar",
    placeholder: "Your avatar link:",
    required: "field is empty",
    pattern: {
      value: linkRegex,
      message: `incorrect link format`,
    },
  },
];

export const fieldsLogin: FormField<User>[] = [
  {
    type: "email",
    name: "email",
    placeholder: "Your email:",
    required: "field is empty",
    pattern: {
      value: emailRegex,
      message: `Invalid email format`,
    },
  },
  {
    type: "password",
    name: "password",
    placeholder: "Your password:",
    required: "field is empty",
    minLength: 6,
  },
];

export const fieldsUpdate: FormField<User>[] = [
  {
    type: "text",
    name: "name",
    placeholder: "Your name:",
    required: "field is empty",
    minLength: 3,
  },
  {
    type: "text",
    name: "avatar",
    placeholder: "Your avatar link:",
    required: "field is empty",
    pattern: {
      value: linkRegex,
      message: `incorrect link format`,
    },
  },
];

export const fieldsAddProduct: FormField<NewProduct>[] = [
  {
    type: "text",
    name: "title",
    placeholder: "Title:",
    required: "field is empty",
    minLength: 3,
  },
  {
    type: "number",
    name: "price",
    min: 1,
    placeholder: "Price:",
    required: "field is empty",
    minLength: 1,
  },

  {
    type: "text",
    name: "description",
    placeholder: "description:",
    required: "field is empty",
    minLength: 6,
  },
  {
    select: true,
    type: "text",
    name: "title",
    placeholder: "select",
    required: "select is empty",
  },
  {
    type: "text",
    name: "images",
    placeholder: "Link to Images (link,link...)",
    required: "field is empty",
    pattern: {
      value: linkRegex,
      message: `incorrect link format`,
    },
  },
];
