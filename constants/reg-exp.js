export const checkStringToLatinAndNum =
  /^([A-Za-z]+[0-9]+|[0-9]+[A-Za-z]+|[A-Za-z]+[0-9]+[A-Za-z]+|[0-9]+[A-Za-z]+[0-9]+)+$/;
export const checkStringToUpperAndNum = /[А-ЯЁA-Z]+[^]+[0-9]|[0-9]+[^]+[А-ЯЁA-Z]|[0-9][А-ЯЁA-Z]|[А-ЯЁA-Z][0-9]/;
export const checkLatinInStr = /^[A-Za-z]+$/;
export const checkCyrilicInStr = /[а-яА-ЯёЁ]/;
export const checkNumInStr = /^[0-9]+$/;
export const checkNumInPassword = /[0-9]/;
export const checkUpperInStr = /^[а-яёa-z0-9]+$/;
export const checkEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
export const checkPhone = [
  '+',
  '3',
  '7',
  '5',
  ' ',
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];
