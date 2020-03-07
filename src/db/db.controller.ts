import conn from "../index"

class DBController {
  getAll(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      conn.query("SELECT * FROM prices;", (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result)
        }
      });
    })
  }
}

export default new DBController();