import * as S from "sanctuary";
import { ShoppingListType, ItemType } from "../entity";

export const findOrCreate = async (name: string, entityType: any) => {
  const maybeType: S.Maybe<ShoppingListType | ItemType> = S.head(await entityType.find({where: {name}}));
  const type = S.fromMaybe(new entityType())(maybeType);
  if (maybeType === S.Nothing) {
    type.name = name;
    return await type.save();
  }
  return type;
};
