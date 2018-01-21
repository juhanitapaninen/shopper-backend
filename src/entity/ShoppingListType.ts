import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ShoppingList } from "./ShoppingList";
import { findOrCreate } from "./utils";

@Entity()
export class ShoppingListType extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 100})
  name: string;

  @OneToMany(type => ShoppingList, item => item.type)
  shopping_lists: ShoppingList[];

  static async findOrCreate(name: string) {
    return findOrCreate(name, ShoppingListType);
  }
}