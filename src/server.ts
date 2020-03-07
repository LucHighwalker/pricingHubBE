import * as express from "express";
import * as mysql from "mysql";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as expressSanitizer from "express-sanitizer";

import pricesRoutes from "./prices/prices.routes";

class Server {
  public server;
  public conn;

  constructor() {
    this.server = express();
    this.connectDb();
    this.applyMiddleware();
    this.mountRoutes();
  }

  private connectDb(): void {
    this.conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.DB_PASS || ""
    });

    this.conn.connect((err: Error) => {
      if (err) throw err;
      this.conn.query("USE pricinghub;", (err: Error, _: any) => {
        if (err) throw err;
        console.log("Database connected!");
      });
    });
  }

  private applyMiddleware(): void {
    this.server.use(expressSanitizer());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cors());
  }

  private mountRoutes(): void {
    this.server.use("/prices", pricesRoutes);
  }
}

export default new Server();
