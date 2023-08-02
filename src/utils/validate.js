const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const validateLink = (link) => {
  const linkRegex = /^https:\/\/.*\.(jpg|png)$/i;

  return linkRegex.test(link);
};
export const blurHandlerRegister = (
  e,
  setNameErrors,
  setEmailErrors,
  setPasswordErrors,
  setAvatarErrors,
  values
) => {
  switch (e.target.name) {
    case "name":
      setNameErrors(values.name.length < 3);
      break;
    case "email":
      setEmailErrors(!validateEmail(values.email));
      break;
    case "password":
      setPasswordErrors(values.password.length < 3);
      break;
    case "avatar":
      setAvatarErrors(!validateLink(values.avatar));
      break;
    default:
      break;
  }
};

const phrases = {
  name: "the name is too short",
  email: "invalid email address",
  password: "is too short (minimum is 6 characters )",
  avatar: `https: and ends with either ".jpg" or ".png"`,
};

export const validateFormRegister = (values, setFormErrors) => {
  let errors = {};
  let isValid = true;

  if (values.name.length < 3) {
    errors.name = phrases.name;
    isValid = false;
  }
  if (!validateEmail(values.email)) {
    errors.email = phrases.email;
    isValid = false;
  }

  if (values.password.length < 3) {
    errors.password = phrases.password;
    isValid = false;
  }
  if (!validateLink(values.avatar)) {
    errors.avatar = phrases.avatar;
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

export const blurHandlerLogin = (
  e,
  setEmailErrors,
  setPasswordErrors,
  values
) => {
  switch (e.target.name) {
    case "email":
      setEmailErrors(!validateEmail(values.email));
      break;
    case "password":
      setPasswordErrors(values.password.length < 6);
      break;

    default:
      break;
  }
};

export const validateFormLogin = (values, setFormErrors) => {
  let errors = {};
  let isValid = true;

  if (!validateEmail(values.email)) {
    errors.email = phrases.email;
    isValid = false;
  }

  if (values.password.length < 6) {
    errors.password = phrases.password;
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

export const blurHandlerAddProduct = (
  e,
  setTitleErrors,
  setPriceErrors,
  setDescriptionErrors,
  setImagesErrors,
  values
) => {
  switch (e.target.name) {
    case "title":
      setTitleErrors(values.title.length < 3);
      break;
    case "price":
      setPriceErrors(values.price < 1);
      break;
    case "description":
      setDescriptionErrors(values.description.length < 6);
      break;
    case "images":
      setImagesErrors(!validateLink(values.images));
      break;

    default:
      break;
  }
};

export const validateFormAddProduct = (values, setFormErrors) => {
  let errors = {};
  let isValid = true;

  if (values.title.length < 3) {
    errors.title = "the title is too short";
    isValid = false;
  }

  if (values.price < 1) {
    errors.price = "is too short price";
    isValid = false;
  }
  if (values.description.length < 6) {
    errors.description = "the description is too short";
    isValid = false;
  }
  if (!validateLink(values.images)) {
    errors.images = phrases.avatar;
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

export const blurHandlerUpdate = (
  e,
  setNameErrors,
  setAvatarErrors,
  values
) => {
  switch (e.target.name) {
    case "name":
      setNameErrors(values.name.length < 3);
      break;
    case "avatar":
      setAvatarErrors(!validateLink(values.avatar));
      break;
    default:
      break;
  }
};

export const validateFormUpdate = (values, setFormErrors) => {
  let errors = {};
  let isValid = true;

  if (values.name.length < 3) {
    errors.name = phrases.name;
    isValid = false;
  }
  if (!validateLink(values.avatar)) {
    errors.avatar = phrases.avatar;
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};
