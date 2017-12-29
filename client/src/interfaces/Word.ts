import Item from "./Item";

export default interface Word {
  tags: Array<string>;
  result_type: string;
  list: Array<Item>;
}