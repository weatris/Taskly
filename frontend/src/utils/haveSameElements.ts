export const haveSameElements = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;

  return (
    arr1.length === arr2.length && arr1.every((item) => arr2.includes(item))
  );
};
