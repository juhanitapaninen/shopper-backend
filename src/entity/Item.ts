import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { ShoppingListItem, ItemType } from "../entity";

@Entity()
export class Item extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 50, unique: true})
  name: string;

  @ManyToOne(type => ItemType, type => type.items, {
    eager: true
  })
  type: ItemType;

  @OneToMany(type => ShoppingListItem, shoppingListItem => shoppingListItem.item)
  shoppingListItems: ShoppingListItem[];

  static createNew(name: string, itemType: ItemType) {
    const item = new Item();
    item.name = name;
    item.type = itemType;
    return item.save();
  }
}
