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
const ShoppingListLitem_1 = require("./ShoppingListLitem");
let ShoppingList = class ShoppingList extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ShoppingList.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50 }),
    __metadata("design:type", String)
], ShoppingList.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("date"),
    __metadata("design:type", Date)
], ShoppingList.prototype, "created", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50 }),
    __metadata("design:type", String)
], ShoppingList.prototype, "type", void 0);
__decorate([
    typeorm_1.OneToMany(type => ShoppingListLitem_1.ShoppingListItem, item => item.shoppingList, {
        eager: true
    }),
    __metadata("design:type", Array)
], ShoppingList.prototype, "items", void 0);
ShoppingList = __decorate([
    typeorm_1.Entity()
], ShoppingList);
exports.ShoppingList = ShoppingList;
//# sourceMappingURL=ShoppingList.js.map