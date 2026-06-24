import React, { createContext, useState, useCallback } from 'react';
import dbEngine from '../database/DatabaseEngine';

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartFromSQL = useCallback(async () => {
    try {
      await dbEngine.initDatabase();
      const result = await dbEngine.execute("SELECT SUM(qty) as totalQty FROM cart;", []);
      if (result && result.rows && result.rows.length > 0) {
        const count = result.rows.item(0).totalQty || 0;
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.log("Error updating global cart context:", error);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartFromSQL }}>
      {children}
    </CartContext.Provider>
  );
};