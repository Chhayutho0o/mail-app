export const removeEmptyValues = (object: { [key: string]: any }) => {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      var value = object[key];
      if (value === null || value === undefined || value === "") {
        delete object[key];
        return object;
      }
    }
  }
};

export const currencyFormat = (number: number, currency: string = "USD") => {
  return number.toLocaleString("en-US", { style: "currency", currency });
};

export const percentFormat = (number: number) => {
  return number.toLocaleString("en-US", { style: "percent" });
};

export const khmercurrencyFormat = (number: number) => {
  return number.toLocaleString("km-KH", { style: "currency", currency: "KHR" });
};
