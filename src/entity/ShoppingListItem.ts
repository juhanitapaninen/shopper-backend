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

  @Column("varchar", {length: 500})
  comment?: string;

  @Column("integer")
  price?: number;

  @Column("integer")
  completed: boolean;

  @Column("integer")
  rejected: boolean;

  @ManyToOne(type => ShoppingList, shoppingList => shoppingList.items)
  shoppingList: ShoppingList;

  @ManyToOne(type => Item, item => item.shoppingListItems, {
    eager: true
  })
  item: Item;

}

