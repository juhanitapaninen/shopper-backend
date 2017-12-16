"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ShoppingList_1 = require("../entity/ShoppingList");
const Int = { type: graphql_1.GraphQLInt };
const String = { type: graphql_1.GraphQLString };
const List = (type) => new graphql_1.GraphQLList(type);
const ShoppingListType = new graphql_1.GraphQLObjectType({
    name: "ShoppingList",
    fields: () => ({
        id: Int,
        name: String,
        created: String,
        type: String,
        items: {
            type: List(ShoppingListItemType),
            resolve(parentValue, args) {
                return parentValue.items;
            }
        }
    })
});
const ShoppingListItemType = new graphql_1.GraphQLObjectType({
    name: "ShoppingListItem",
    fields: () => ({
        id: Int,
        name: String,
        url: String,
        shoppingList: {
            type: ShoppingListType
        }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        shoppingList: {
            type: List(ShoppingListType),
            args: { id: Int, name: String, created: String, type: String },
            resolve(parentValue, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield ShoppingList_1.ShoppingList.find({ where: Object.assign({}, args) });
                });
            }
        }
    })
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery
});
//# sourceMappingURL=schema.js.map