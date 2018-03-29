import * as express from "express";
import * as expressGraphQL from "express-graphql";
import * as bodyParser from "body-parser";
import * as winston from "winston";
import * as logger from "morgan";
import * as lusca from "lusca";
import * as cors from "cors";
import * as jwt from "express-jwt";
import * as dotEnv from "dotenv";
import * as errorHandler from "errorhandler";
import { createConnection } from "typeorm";
import * as homeController from "./controllers/home";
import * as shoppingListController from "./controllers/ShoppingList";
import { User } from "./entity/User";
import schema from "./schema/schema";

dotEnv.config();

createConnection().then(async connection => {

  const app = express();

  app.set("port", process.env.PORT || 8080);
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());
  app.use(lusca.xframe("SAMEORIGIN"));
  app.use(lusca.xssProtection(true));

  app.use(
    "/graphql",
    jwt({secret: process.env.JWT_SECRET, credentialsRequired: false}),
    expressGraphQL(async req => ({
      schema,
      graphiql: true, // TODO: Set only on DEV mode
      context: {
        user: req.user,
      },
      formatError: (err: any) => ({ message: err.message, status: err.status }),
    }))
  );

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

}).catch(error => console.log("TypeORM connection error: ", error));
