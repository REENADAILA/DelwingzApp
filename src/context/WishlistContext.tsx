import React, { createContext, useState, useCallback, useContext } from 'react';
import dbEngine from '../database/DatabaseEngine';

export const WishlistContext = createContext<any>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistCount, setWishlistCount] = useState(0);

  // 🔄 EXACTLY CART CONTEXT GLOBAL COUNT SYNC METHOD
  const refreshWishlistFromSQL = useCallback(async () => {
    try {
      await dbEngine.initDatabase();
      const result = await dbEngine.execute("SELECT COUNT(*) as totalItems FROM wishlist;", []);
      if (result && result.rows && result.rows.length > 0) {
        const count = result.rows.item(0).totalItems || 0;
        setWishlistCount(count);
      } else {
        setWishlistCount(0);
      }
    } catch (error) {
      console.log("Error updating global wishlist context counter metrics:", error);
    }
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistCount, refreshWishlistFromSQL }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};