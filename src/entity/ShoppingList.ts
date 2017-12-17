import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ShoppingListItem } from "./ShoppingListItem";

@Entity()
export class ShoppingList extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 50})
  name: string;

  @Column("date")
  created: Date;

  @Column("varchar", {length: 50})
  type: string;

  @OneToMany(type => ShoppingListItem, item => item.shoppingList, {
    eager: true
  })
  items: ShoppingListItem[];

}