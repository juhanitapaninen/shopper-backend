import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ShoppingList } from "./ShoppingList";
import * as S from "sanctuary";

@Entity()
export class ShoppingListType extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 100})
  name: string;

  @OneToMany(type => ShoppingList, item => item.type)
  shopping_lists: ShoppingList[];

  static async findOrCreate(name: string) {
    // TODO Refactor with IteType findOrCreate
    const maybeType: S.Maybe<ShoppingListType> = S.head(await ShoppingListType.find({where: {name}}));
    const type = S.fromMaybe(new ShoppingListType())(maybeType);
    if (maybeType === S.Nothing) {
      type.name = name;
      return await type.save();
    }
  }
}