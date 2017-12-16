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
const ShoppingList_1 = require("../entity/ShoppingList");
/**
 * Loads all posts from the database.
 */
function shoppingListGetAll(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // const lists = await ShoppingList.find({relations: ["items"]});
        const lists = yield ShoppingList_1.ShoppingList.find({ where: { id: 1 } });
        response.send(lists);
    });
}
exports.shoppingListGetAll = shoppingListGetAll;
//# sourceMappingURL=ShoppingList.js.map