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
const express = require("express");
const expressGraphQL = require("express-graphql");
const bodyParser = require("body-parser");
const winston = require("winston");
const logger = require("morgan");
const lusca = require("lusca");
const errorHandler = require("errorhandler");
const typeorm_1 = require("typeorm");
const homeController = require("./controllers/home");
const shoppingListController = require("./controllers/ShoppingList");
const schema_1 = require("./schema/schema");
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
    const app = express();
    app.set("port", process.env.PORT || 8080);
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(lusca.xframe("SAMEORIGIN"));
    app.use(lusca.xssProtection(true));
    app.use("/graphql", expressGraphQL({
        schema: schema_1.default,
        graphiql: true // TODO: Set only on DEV mode
    }));
    app.get("/", homeController.index);
    app.get("/lists", shoppingListController.shoppingListGetAll);
    /**
     * Error Handler. Provides full stack - remove for production
     */
    app.use(errorHandler());
    app.listen(app.get("port"), () => {
        winston.log("info", ("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
        winston.log("info", "  Press CTRL-C to stop\n");
    });
})).catch(error => console.log("TypeORM connection error: ", error));
//# sourceMappingURL=index.js.map