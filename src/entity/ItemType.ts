import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Item } from "./Item";
import * as S from "sanctuary";

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
    const maybeType: S.Maybe<ItemType> = S.head(await ItemType.find({ where: {name} }));
    const type = S.fromMaybe(new ItemType())(maybeType);
    if (maybeType === S.Nothing) {
      type.name = name;
      return await type.save();
    }
  }
  static async delete(id: number) {
    const itemType = await ItemType.findOneById(id);
    return await itemType.remove();
  }
}