import conn from "../index";

class DBController {
  getAll(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      conn.query("SELECT * FROM prices;", (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  getCompetitor(comp: String): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const query = `SELECT * FROM prices WHERE competitor=${conn.escape(comp + "\r")};`;
      conn.query(query, (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

export default new DBController();
