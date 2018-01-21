import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Item } from "../entity";
import { findOrCreate } from "./utils";

@Entity()
export class ItemType extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 100, unique: true})
  name: string;

  @OneToMany(type => Item, item => item.type)
  items: Item[];

  static createNew(name: string) {
    const itemType = new ItemType();
    itemType.name = name;
    return itemType.save();
  }
  static async findOrCreate(name: string) {
    return findOrCreate(name, ItemType);
  }
  static async delete(id: number) {
    const itemType = await ItemType.findOneById(id);
    return await itemType.remove();
  }
}