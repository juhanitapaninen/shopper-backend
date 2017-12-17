import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ShoppingListItem } from "./ShoppingListItem";

@Entity()
export class Item extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 50})
  name: string;

  @Column("varchar", {length: 50})
  type: string;

  @OneToMany(type => ShoppingListItem, shoppingListItem => shoppingListItem.item)
  shoppingListItems: ShoppingListItem[];

}
