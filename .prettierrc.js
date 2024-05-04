const { getAllJSDocTagsOfKind } = require("typescript");

module.exports = {
  // String is in single quotes (') 
  // 문자열은 홀따옴표(')로 
  singleQuote: true,
  // With a semicolon at the end of the code. 
  // 코드 마지막에 세미콜른이 있게 
  semi: true,
  // Do not use tabs and replace them with space bars. 
  // 탭의 사용을 금하고 스페이스바 사용으로 대체하게
  useTabs: false,
  // Indentation width of 2 spaces 
  // 들여쓰기 너비는 2칸
  tabWidth: 2,
  // When you create an object or array, you also put a comma on the element or on the back of the key-value.
  // 객체나 배열을 작성 할 때, 원소 혹은 key-valueㅇ의 맨 뒤에 있는 것에도 쉼표를 붙임
  trailingComma: 'all',
  //One line of code is maximum 80 spaces 
  // 코드 한줄이 maximum 80칸
  printWidth: 80,
}; 