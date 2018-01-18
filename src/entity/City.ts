import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ShoppingList } from "./ShoppingList";

@Entity()
export class City extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 100, unique: true})
  name: string;

  @OneToMany(type => ShoppingList, item => item.city)
  shopping_lists: ShoppingList[];

  static createNew(name: string) {
    const city = new City();
    city.name = name;
    return city.save();
  }
  static async delete(id: number) {
    const city = await City.findOneById(id);
    return await city.remove();
  }
}