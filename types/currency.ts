interface CurrencyBaseObject {
  name: string;
  code: string;
  symbol: string;
}
interface CurrencyObject {
  id: number;
  name: string;
  code: string;
  symbol: string;
}
export { CurrencyObject, CurrencyBaseObject };