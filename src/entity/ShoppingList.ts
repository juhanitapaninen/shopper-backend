import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { City, ShoppingListItem, ShoppingListType } from "../entity";

@Entity()
export class ShoppingList extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 100, nullable: true})
  name?: string;

  @Column("date")
  created: Date;

  @Column("date", { nullable: true })
  target?: Date;

  @Column("date", { nullable: true })
  completed?: Date;

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

  static createNew(name: string, city: City, shoppingListType: ShoppingListType, target: Date) {
    const shoppingList = new ShoppingList();
    shoppingList.name = name;
    shoppingList.city = city;
    shoppingList.type = shoppingListType;
    if (target) {
      shoppingList.target = target;
    }
    shoppingList.created = new Date();
    return shoppingList.save();
  }
}