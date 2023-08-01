const today = new Date();
const year = today.getFullYear();
const day = today.getDate();
const month = today.getMonth() + 1;
const hour = today.getHours();
const min = today.getMinutes();

export const DATE = `${day}-${month}-${year}`;
export const TIMESTAPS = `${day}-${month}-${year} ${hour}:${min}`;
