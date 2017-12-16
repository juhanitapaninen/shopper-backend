import { Request, Response } from "express";
import { ShoppingList } from "../entity/ShoppingList";
import { ShoppingListItem } from "../entity/ShoppingListLitem";

/**
 * Loads all posts from the database.
 */
export async function shoppingListGetAll(request: Request, response: Response) {
  // const lists = await ShoppingList.find({relations: ["items"]});
  const lists = await ShoppingList.find({ where: { id: 1 } });
  response.send(lists);
}

