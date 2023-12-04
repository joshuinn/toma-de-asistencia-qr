export const formatText = (name, text) => {
  if (!text.length) {
    return text;
  }
  let textFormated;
  switch (name) {
    case "grupo":
      textFormated = text.toUpperCase();
      if (textFormated.length > 5) {
        textFormated = textFormated.slice(0, -1);
      }
      break;
    case "nombre":
    case "materia":
    case "maestro":
      textFormated = text.split(" ");
      textFormated = textFormated
        .map((word) => {
          if (word[0]) {
            return word[0].toUpperCase() + word.substring(1);
          }
        })
        .join(" ");
      break;
    case "laboratorio":
      textFormated = "";
      for (let i = 0; i < text.length; i++) {
        if (parseInt(text[i])) {
          textFormated += text[i];
        }
      }
      if (textFormated.length > 2) {
        textFormated = textFormated.slice(0, 2);
      }
      break;
    case "ciclo":
      textFormated = text.toUpperCase();
      if (textFormated.length > 6) {
        textFormated = textFormated.slice(0, -1);
      }
      break;
    case "boleta":
      textFormated = "";
      for (let i = 0; i < text.length; i++) {
        if (parseInt(text[i])) {
          textFormated += text[i];
        }
      }
      if (textFormated.length > 10) {
        textFormated = textFormated.slice(0, 10);
      }
      break;
    default:
      textFormated = text;
      break;
  }
  return textFormated;
};

export const isEmailValid = (email) => {
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return emailRegex.test(email);
};
export const isPasswordValid = (password) => {
  return password.length > 5 ? true : false;
};
