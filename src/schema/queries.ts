import { ShoppingList } from "../entity/ShoppingList";
import { City, Item, ItemType } from "../entity";
import * as S from "sanctuary";

const getShoppingList = async (parent: any, args: any) =>
  await ShoppingList.find(args && { where: {...args} });
const getNextShoppingList = async () => S.pipe([
  S.head,
  S.fromMaybe({})
])(await ShoppingList.find({order: {"target": "ASC"}}));
const getItemTypes = async () => await ItemType.find();
const getCities = async () => await City.find();
const getItems = async () => await Item.find();

export {
  getShoppingList, getNextShoppingList, getItemTypes, getCities, getItems
};
