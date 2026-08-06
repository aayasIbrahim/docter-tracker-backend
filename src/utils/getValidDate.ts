 export const isValidDate = (dateVal: any): boolean => {
    if (!dateVal || dateVal === "undefined" || dateVal === "null") return false;
    const timestamp = Date.parse(dateVal);
    return !isNaN(timestamp);
  };