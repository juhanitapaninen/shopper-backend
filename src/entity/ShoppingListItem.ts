import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ShoppingList } from "./ShoppingList";
import { Item } from "./Item";

interface ShoppingListItemUpdatableFields {
  completed: boolean;
  rejected: boolean;
  name: string;
  comment: string;
  price: number;
  url: string;
}

@Entity()
export class ShoppingListItem extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 500, nullable: true})
  url?: string;

  @Column("varchar", {length: 500, nullable: true})
  comment?: string;

  @Column("integer", {nullable: true})
  price?: number;

  @Column("boolean", {default: false})
  completed: boolean;

  @Column("boolean", {default: false})
  rejected: boolean;

  @ManyToOne(type => ShoppingList, shoppingList => shoppingList.items, {nullable: false})
  shoppingList: ShoppingList;

  @ManyToOne(type => Item, item => item.shoppingListItems, {
    eager: true,
    nullable: false
  })
  item: Item;

  static createNew(shoppingList: ShoppingList, item: Item, comment: string, price: number, url: string) {
    const shoppingListItem = new ShoppingListItem();
   shoppingListItem.shoppingList = shoppingList;
   shoppingListItem.item = item;
   shoppingListItem.comment = comment;
   shoppingListItem.price = price;
   shoppingListItem.url = url;
   return shoppingListItem.save();
  }
}

