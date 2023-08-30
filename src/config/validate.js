const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const linkRegex = /^https:\/\/.*\.(jpg|png)$/i;

export const fieldsRegister = [
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

export const fieldsLogin = [
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

export const fieldsUpdate = [
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

export const fieldsAddProduct = [
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
    min: "1",
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
