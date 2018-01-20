import { City } from "../entity/City";
import { Item } from "../entity/Item";
import { ItemType } from "../entity/ItemType";
import * as S from "sanctuary";

export const addValue = (item: ItemType | City | Item, values: object) => (key: string) =>
  (item as any)[key] = (values as any)[key];

export const addValues = (item: ItemType | City | Item, values: object) =>
  S.pipe([S.keys, addValue(item, values)])(values);