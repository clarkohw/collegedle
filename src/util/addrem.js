export const addRem = (remValue, number) => {
  return (
    parseFloat(remValue.substring(0, remValue.length - 3)) + number + "rem"
  );
};
