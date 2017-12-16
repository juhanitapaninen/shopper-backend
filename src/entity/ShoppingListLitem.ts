import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ShoppingList } from "./ShoppingList";
import { Item } from "./Item";

@Entity()
export class ShoppingListItem extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 100})
  name?: string;

  @Column("varchar", {length: 500})
  url?: string;

  @ManyToOne(type => ShoppingList, shoppingList => shoppingList.items)
  shoppingList: ShoppingList;

  @ManyToOne(type => Item, item => item.shoppingListItems)
  item: Item;

}

