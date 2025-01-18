export const generateRandomId = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const haveSameElements = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;

  return (
    arr1.length === arr2.length && arr1.every((item) => arr2.includes(item))
  );
};
