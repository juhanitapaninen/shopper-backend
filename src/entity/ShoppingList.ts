import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { City, ShoppingListItem, ShoppingListType } from "../entity";

@Entity()
export class ShoppingList extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 100})
  name: string;

  @Column("date")
  created: Date;

  @Column("date")
  target: Date;

  @Column("date")
  completed: Date;

  @ManyToOne(type => City, city => city.shopping_lists, {
    eager: true
  })
  city: City;

  @ManyToOne(type => ShoppingListType, type => type.shopping_lists, {
    eager: true
  })
  type: ShoppingListType;

  @OneToMany(type => ShoppingListItem, item => item.shoppingList, {
    eager: true
  })
  items: ShoppingListItem[];

}