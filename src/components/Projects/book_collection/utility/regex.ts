export const nameRegex = /[\p{Mn}\p{P}\p{Z}\p{L}À-ÿ\w]+/;
export const lastNameRegex = /^[a-zA-Z]*[-']*[a-zA-Z]+/;
export const smallLettersRegex = /^[a-z]+$/;
export const websiteRegex =
  /^(https?:\/\/)?([\w\d_]+)\.([\w\d_.]+)\/?\??([^#\n\r]*)?#?([^\n\r]*)/m;
export const numbersRegex = /^[0-9]+$/;
export const isbnRegex =
  /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
