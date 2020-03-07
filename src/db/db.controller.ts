import conn from "../index";

export interface dataResponse {
  label: String;
  fill: Boolean;
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
      conn.query("SELECT * FROM prices;", (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.digestData(result));
        }
      });
    });
  }

  getCompetitor(comp: String): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const query = `SELECT * FROM prices WHERE competitor=${conn.escape(
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

  digestData(data: any): dataResponse[] {
    const dict = {};
    const result = [];
    data.forEach(d => {
      if (dict[d.competitor] == undefined) {
        dict[d.competitor] = {
          label: d.competitor,
          fill: false,
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
      result.push(dict[k])
    })
    return result;
  }
}

export default new DBController();
