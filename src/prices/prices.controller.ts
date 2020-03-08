import db from "../db/db.controller";

class PricesController {
  public competitor(comp: String): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.getCompetitor(comp);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
	}
	
	public competitorList(): Promise<any> {
		return new Promise(async (resolve, reject) => {
      try {
        const result = await db.getCompetitorList();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
	}

  public getAll(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.getAll();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new PricesController();
