// @ts-ignore
import SQLite from 'react-native-sqlite-storage';

// Promise layer enable karein
SQLite.enablePromise(true);

const database_name = "DelwingzApp.db";

class DatabaseEngine {
  private db: any = null;

  // 1. Initialize Database & Create Tables
  async initDatabase() {
    if (this.db) return this.db;

    try {
      this.db = await SQLite.openDatabase({
        name: database_name,
        location: 'default',
      });

      // Cart Table Scheme
      await this.execute(
        `CREATE TABLE IF NOT EXISTS cart (
          id TEXT PRIMARY KEY,
          name TEXT,
          price REAL,
          size TEXT,
          qty INTEGER,
          image TEXT,
          description TEXT,
          rating REAL
        );`,
        []
      );

      // Instant Checkout Table Scheme
      await this.execute(
        `CREATE TABLE IF NOT EXISTS instant_checkout (
          id TEXT PRIMARY KEY,
          name TEXT,
          price REAL,
          size TEXT,
          qty INTEGER,
          image TEXT,
          description TEXT
        );`,
        []
      );

      console.log("Standard SQLite Engine Configured!");
      return this.db;
    } catch (error) {
      console.log("SQLite Engine Error:", error);
      throw error;
    }
  }

  // 2. Core Execution Bridge
  async execute(query: string, params: any[] = []): Promise<any> {
    if (!this.db) {
      await this.initDatabase();
    }
    
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
        tx.executeSql(
          query,
          params,
          (_: any, results: any) => {
            resolve(results);
          },
          (_: any, error: any) => {
            reject(error);
          }
        );
      });
    });
  }

  async clearInstantCheckout() {
    return this.execute("DELETE FROM instant_checkout;", []);
  }

  async addToInstantCheckout(item: any) {
    return this.execute(
      "INSERT OR REPLACE INTO instant_checkout (id, name, price, size, qty, image, description) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [item.id, item.name, item.price, item.size, item.qty, String(item.image), item.description]
    );
  }
}

const dbEngine = new DatabaseEngine();
export default dbEngine;