import conn from "../index";

export interface dataResponse {
  label: String;
  data: [
    {
      x: String;
      y: Float32Array;
    }
  ];
}

class DBController {
  getAll(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      conn.query(
        'SELECT DATE_FORMAT(day, "%m/%d/%Y") AS day, price, competitor FROM prices;',
        (err: Error, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(this.digestData(result));
          }
        }
      );
    });
  }

  getCompetitor(comp: String): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const query = `SELECT DATE_FORMAT(day, "%m/%d/%Y") AS day, price, competitor FROM prices WHERE competitor=${conn.escape(
        comp + "\r"
      )};`;
      conn.query(query, (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.digestData(result));
        }
      });
    });
  }

  getCompetitorList(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const query = "SELECT DISTINCT competitor FROM prices";
      conn.query(query, (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.map(r => r.competitor.replace("\r", "")));
        }
      });
    });
  }

  addPrice(comp: string, date: string, price: Float32Array): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const query = `INSERT INTO prices(day,price,competitor) VALUES(${conn.escape(
        date
      )},${conn.escape(price)},${conn.escape(comp + "\r")})`;
      conn.query(query, (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  digestData(data: any): dataResponse[] {
    const dict = {};
    const result = [];
    data.forEach(d => {
      if (dict[d.competitor] == undefined) {
        dict[d.competitor] = {
          label: d.competitor,
          data: [
            {
              x: d.day,
              y: d.price
            }
          ]
        };
      } else {
        dict[d.competitor].data.push({
          x: d.day,
          y: d.price
        });
      }
    });
    Object.keys(dict).forEach(k => {
      result.push(dict[k]);
    });
    return result;
  }
}

export default new DBController();
