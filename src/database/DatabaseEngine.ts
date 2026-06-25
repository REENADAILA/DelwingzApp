import SQLite from 'react-native-sqlite-storage';

if ((SQLite as any).enablePromise) {
  (SQLite as any).enablePromise(true);
}

const database_name = "DelwingzApp.db";

export interface WishlistItem {
  id: string;
  title: string;
  name?: string; 
  price: number;
  mrp: number;
  discount: string;
  selectedVariant: string;
  variants: string[];
  image: string;
}

class DatabaseEngine {
  private db: any = null;

  async initDatabase(): Promise<any> {
    if (this.db) return this.db;

    try {
      if (!SQLite || typeof (SQLite as any).openDatabase !== 'function') {
        throw new Error("SQLite implementation structure not found. Ensure dependency linkage.");
      }

      this.db = await (SQLite as any).openDatabase({
        name: database_name,
        location: 'default',
      });

      // Cart Table Setup
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
        );`
      );

      // Checkout Table Setup
      await this.execute(
        `CREATE TABLE IF NOT EXISTS instant_checkout (
          id TEXT PRIMARY KEY,
          name TEXT,
          price REAL,
          size TEXT,
          qty INTEGER,
          image TEXT,
          description TEXT
        );`
      );

      // Wishlist Table Setup
      await this.execute(
        `CREATE TABLE IF NOT EXISTS wishlist (
          id TEXT PRIMARY KEY,
          title TEXT,
          name TEXT,
          price REAL,
          mrp REAL,
          discount TEXT,
          selectedVariant TEXT,
          variants TEXT,
          image TEXT
        );`
      );

      // ─── SAFE MIGRATION FOR OLD INSTALLED BASES ───
      // Automatically injects the 'name' column if missing on older database instances
      try {
        await this.execute("ALTER TABLE wishlist ADD COLUMN name TEXT;", []);
        console.log("Database Migration: Added missing 'name' column to existing wishlist schema.");
      } catch (migrationError) {
        // Safe to suppress: throws error if 'name' column already exists in the schema layout
        console.log("Database Migration Check: Schema is already up to date.");
      }

      console.log("Standard SQLite Engine Configured and Initialized Successfully!");
      return this.db;
    } catch (error) {
      console.error("SQLite Engine Initialization Error:", error);
      throw error;
    }
  }

  async execute(query: string, params: any[] = []): Promise<any> {
    try {
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
              console.error(`SQL Execution Error on Query [${query}]:`, error);
              reject(error);
              return false;
            }
          );
        });
      });
    } catch (outerError) {
      console.error(`Fatal crash caught inside execute pipeline for [${query}]:`, outerError);
      throw outerError;
    }
  }

  async clearInstantCheckout(): Promise<any> {
    return this.execute("DELETE FROM instant_checkout;", []);
  }

  async addToInstantCheckout(item: any): Promise<any> {
    return this.execute(
      "INSERT OR REPLACE INTO instant_checkout (id, name, price, size, qty, image, description) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [
        item.id, 
        item.name || '', 
        item.price || 0, 
        item.size || '', 
        item.qty || 1, 
        item.image ? String(item.image) : '', 
        item.description || ''
      ]
    );
  }

  async addToWishlist(item: WishlistItem): Promise<any> {
    const variantsStr = Array.isArray(item.variants) ? JSON.stringify(item.variants) : "[]";
    const finalTitle = item.title || item.name || 'Premium Meat';
    const finalName = item.name || item.title || 'Premium Meat';

    return this.execute(
      "INSERT OR REPLACE INTO wishlist (id, title, name, price, mrp, discount, selectedVariant, variants, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        item.id, 
        finalTitle,
        finalName,
        item.price || 0, 
        item.mrp || 0, 
        item.discount || '', 
        item.selectedVariant || '', 
        variantsStr, 
        item.image ? String(item.image) : ''
      ]
    );
  }

  async removeFromWishlist(id: string): Promise<any> {
    return this.execute("DELETE FROM wishlist WHERE id = ?;", [id]);
  }

  async getWishlistItems(): Promise<WishlistItem[]> {
    try {
      const results = await this.execute("SELECT * FROM wishlist;", []);
      const items: WishlistItem[] = [];
      
      if (results && results.rows && results.rows.length > 0) {
        for (let i = 0; i < results.rows.length; i++) {
          const row = results.rows.item(i);
          let parsedVariants = [];
          
          try {
            parsedVariants = row.variants ? JSON.parse(row.variants) : [];
          } catch (e) {
            console.warn(`Failed to parse variants JSON for product ID: ${row.id}`, e);
          }

          items.push({
            id: row.id,
            title: row.title || row.name || '',
            name: row.name || row.title || '',
            price: row.price || 0,
            mrp: row.mrp || 0,
            discount: row.discount || '',
            selectedVariant: row.selectedVariant || '',
            variants: parsedVariants,
            image: row.image || ''
          });
        }
      }
      return items;
    } catch (error) {
      console.error("Error fetching items from wishlist table:", error);
      return [];
    }
  }
}

const dbEngine = new DatabaseEngine();
export default dbEngine;