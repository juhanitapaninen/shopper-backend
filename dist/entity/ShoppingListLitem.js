"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ShoppingList_1 = require("./ShoppingList");
const Item_1 = require("./Item");
let ShoppingListItem = class ShoppingListItem extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ShoppingListItem.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100 }),
    __metadata("design:type", String)
], ShoppingListItem.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], ShoppingListItem.prototype, "url", void 0);
__decorate([
    typeorm_1.ManyToOne(type => ShoppingList_1.ShoppingList, shoppingList => shoppingList.items),
    __metadata("design:type", ShoppingList_1.ShoppingList)
], ShoppingListItem.prototype, "shoppingList", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Item_1.Item, item => item.shoppingListItems),
    __metadata("design:type", Item_1.Item)
], ShoppingListItem.prototype, "item", void 0);
ShoppingListItem = __decorate([
    typeorm_1.Entity()
], ShoppingListItem);
exports.ShoppingListItem = ShoppingListItem;
//# sourceMappingURL=ShoppingListLitem.js.map