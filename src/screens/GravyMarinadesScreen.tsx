import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from '../context/CartContext'; 
import dbEngine from '../database/DatabaseEngine';

const GRAVY_PRODUCTS = [
  {
    id: 'gm1',
    name: 'Afghan Ka Pathan Chicken Tikka',
    weight: '165g',
    price: '900',
    oldPrice: '1000',
    discount: '10% OFF',
    image: require('../assets/image/GravyMarinades.jpeg'), 
    description: 'Rich gravy marinade styled with premium aromatic spices.',
  },
  {
    id: 'gm2',
    name: 'Cheesy Tomato Chicken Tikka',
    weight: '165g',
    price: '179',
    oldPrice: '199',
    discount: '10% OFF',
    image: require('../assets/image/KeralaCoconutCurryChickenGravy.jpeg'), 
    description: 'Creamy cheese and tangy tomato infused chicken tikka gravy.',
  },
];

export default function GravyMarinadesScreen({ navigation }: any) {
  const { refreshCartFromSQL } = useContext(CartContext) || {};
  
  // 🔘 States tracking for flash transitions, direct quantity updates, and live tab counter bubble
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [animatingButtons, setAnimatingButtons] = useState<{ [key: string]: boolean }>({});
  const [cartBadgeCount, setCartBadgeCount] = useState<number>(0);

  // 🛒 Initialize setup by pulling current items array from SQLite
  useEffect(() => {
    fetchCurrentCartStatus();
  }, []);

  const fetchCurrentCartStatus = async () => {
    try {
      await dbEngine.initDatabase();
      const result = await dbEngine.execute("SELECT id, qty FROM cart;", []);
      
      if (result && result.rows) {
        let totalCount = 0;
        const currentQtyMap: { [key: string]: number } = {};
        
        for (let i = 0; i < result.rows.length; i++) {
          const item = result.rows.item(i);
          currentQtyMap[item.id] = item.qty;
          totalCount += item.qty;
        }
        setQuantities(currentQtyMap);
        setCartBadgeCount(totalCount);
      }
    } catch (error) {
      console.log("Error reading initialization quantities from SQLite:", error);
    }
  };

  // ➕ PLUS / FIRST CLICK ENGINE HANDLER
  const handleAddToCart = async (product: any) => {
    const currentQty = quantities[product.id] || 0;
    const nextQty = currentQty + 1;

    try {
      // Background temporary colored flash switch (1.2 Seconds state shift)
      if (currentQty === 0) {
        setAnimatingButtons(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
          setAnimatingButtons(prev => ({ ...prev, [product.id]: false }));
        }, 1200);
      }

      await dbEngine.initDatabase();
      
      if (currentQty > 0) {
        await dbEngine.execute("UPDATE cart SET qty = ? WHERE id = ?;", [nextQty, product.id]);
      } else {
        await dbEngine.execute(
          "INSERT INTO cart (id, name, price, size, qty, image, description, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
          [product.id, product.name, parseFloat(product.price), product.weight, 1, String(product.image), product.description, 4.8]
        );
      }

      setQuantities(prev => ({ ...prev, [product.id]: nextQty }));
      setCartBadgeCount(prev => prev + 1);

      if (refreshCartFromSQL) refreshCartFromSQL();
    } catch (error) {
      console.log("SQL Insertion Mutation Error:", error);
    }
  };

  // ➖ MINUS COUNTER DECREMENT HANDLER
  const handleRemoveFromCart = async (product: any) => {
    const currentQty = quantities[product.id] || 0;
    if (currentQty <= 0) return;

    const nextQty = currentQty - 1;

    try {
      await dbEngine.initDatabase();

      if (nextQty === 0) {
        await dbEngine.execute("DELETE FROM cart WHERE id = ?;", [product.id]);
        setQuantities(prev => {
          const updated = { ...prev };
          delete updated[product.id];
          return updated;
        });
      } else {
        await dbEngine.execute("UPDATE cart SET qty = ? WHERE id = ?;", [nextQty, product.id]);
        setQuantities(prev => ({ ...prev, [product.id]: nextQty }));
      }

      setCartBadgeCount(prev => Math.max(0, prev - 1));
      if (refreshCartFromSQL) refreshCartFromSQL();
    } catch (error) {
      console.log("SQL Decrement Mutation Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* 1. TOP APP HEADER BAR */}
      <View style={styles.appHeader}>
        <Text style={styles.brandLogo}>Delwingz</Text>
        <View style={styles.headerRightIcons}>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleSwitch} />
            <Text style={styles.toggleText}>Bulk Order</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="search-outline" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Profile')}>
            <Icon name="menu-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        
        {/* 2. BURGUNDY CATEGORY HEADER BANNER */}
        <View style={styles.categoryBanner}>
          <TouchableOpacity style={styles.backArrowBtn} onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={20} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.categoryIconSquare}>
            <Image source={require('../assets/image/GravyMarinades.jpeg')} style={styles.smallBannerImg} resizeMode="cover" />
          </View>
          <View>
            <Text style={styles.bannerLabel}>CATEGORY</Text>
            <Text style={styles.bannerTitle}>Gravy Marinades</Text>
          </View>
        </View>

        {/* 3. FILTER PILLS SECTION */}
        <View style={styles.pillsRow}>
          <View style={styles.activePill}>
            <Text style={styles.activePillText}>All</Text>
          </View>
        </View>

        {/* 4. 2-COLUMN PRODUCT GRID */}
        <View style={styles.productsGrid}>
          {GRAVY_PRODUCTS.map((product) => {
            const qty = quantities[product.id] || 0;
            const isAnimating = animatingButtons[product.id];

            return (
              <View key={product.id} style={styles.productCard}>
                
                {/* Product Upper Block linked to Detail Routing */}
                <TouchableOpacity 
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
                >
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>{product.discount}</Text>
                  </View>

                  <Image source={product.image} style={styles.productImg} resizeMode="cover" />
                  
                  <View style={styles.productTopInfo}>
                    <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                    <Text style={styles.weightText}>{product.weight}</Text>
                  </View>
                </TouchableOpacity>
                
                {/* Bottom Independent Action Segment */}
                <View style={styles.productBottomActionBlock}>
                  <View style={styles.priceActionRow}>
                    <View>
                      <Text style={styles.currentPrice}>₹{product.price}</Text>
                      <Text style={styles.oldPrice}>₹{product.oldPrice}</Text>
                    </View>
                    
                    {/* TRANSFORMING DYNAMIC COUNTER BAR */}
                    {isAnimating ? (
                      <View style={styles.animatingButtonBlock}>
                        <Text style={styles.animatingButtonText}>ADDED</Text>
                      </View>
                    ) : qty > 0 ? (
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.qtyControlBtn} onPress={() => handleRemoveFromCart(product)}>
                          <Icon name="remove" size={14} color="#B31942" style={styles.boldIcon} />
                        </TouchableOpacity>
                        <Text style={styles.qtyCountLabel}>{qty}</Text>
                        <TouchableOpacity style={styles.qtyControlBtn} onPress={() => handleAddToCart(product)}>
                          <Icon name="add" size={14} color="#B31942" style={styles.boldIcon} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity 
                        style={styles.addButton}
                        activeOpacity={0.7}
                        onPress={() => handleAddToCart(product)}
                      >
                        <Text style={styles.addButtonText}>ADD</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* 5. BOTTOM TAB BAR WITH SYNCHRONIZED COUNTER BADGE */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Categories')}>
          <Icon name="grid" size={20} color="#B31942" />
          <Text style={styles.activeTabLabel}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Survey')}>
          <Icon name="document-text-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Survey</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Subscription')}>
          <Icon name="calendar-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Cart')}>
          <View style={styles.cartIconWrapper}>
            <Icon name="cart-outline" size={21} color="#718096" />
            {cartBadgeCount > 0 && (
              <View style={styles.badgeNotificationBubble}>
                <Text style={styles.badgeText}>{cartBadgeCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.tabLabel}>Cart</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F6' },
  appHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 15, backgroundColor: '#FFF' },
  brandLogo: { fontSize: 22, fontWeight: 'bold', color: '#B31942', fontStyle: 'italic' },
  headerRightIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF0F2', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FFE4E6' },
  toggleSwitch: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#CBD5E0', marginRight: 6 },
  toggleText: { fontSize: 12, fontWeight: '700', color: '#B31942' },
  iconBtn: { padding: 4 },

  scrollPadding: { paddingBottom: 90 },
  categoryBanner: { backgroundColor: '#800A26', marginHorizontal: 16, marginTop: 15, borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center' },
  backArrowBtn: { borderRightWidth: 1, borderColor: 'rgba(255,255,255,0.2)', paddingRight: 12, marginRight: 12 },
  categoryIconSquare: { width: 45, height: 45, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginRight: 12, overflow: 'hidden' },
  smallBannerImg: { width: '100%', height: '100%' },
  bannerLabel: { fontSize: 10, color: '#FFB8C6', fontWeight: 'bold', letterSpacing: 0.8 },
  bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF', marginTop: 1 },

  pillsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginTop: 20, marginBottom: 15 },
  activePill: { backgroundColor: '#B31942', paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20 },
  activePillText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },

  productsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, justifyContent: 'space-between' },
  productCard: { width: '48%', backgroundColor: '#FFF', borderRadius: 16, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#FFE4E6' },
  discountBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: '#28A745', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 6, zIndex: 1 },
  discountBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  productImg: { width: '100%', height: 110, backgroundColor: '#FAFAFA' },
  productTopInfo: { paddingHorizontal: 12, paddingTop: 12 },
  productBottomActionBlock: { paddingHorizontal: 12, paddingBottom: 12 },
  productName: { fontSize: 13, fontWeight: 'bold', color: '#1A202C', height: 36, lineHeight: 18 },
  weightText: { fontSize: 12, color: '#718096', marginTop: 4, marginBottom: 4 },
  priceActionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  currentPrice: { fontSize: 16, fontWeight: 'bold', color: '#1A202C' },
  oldPrice: { fontSize: 11, color: '#A0AEC0', textDecorationLine: 'line-through', marginTop: 1 },
  
  addButton: { borderWidth: 1, borderColor: '#B31942', paddingVertical: 5, paddingHorizontal: 16, borderRadius: 6, backgroundColor: '#FFF', minWidth: 65, alignItems: 'center' },
  addButtonText: { color: '#B31942', fontWeight: 'bold', fontSize: 12 },

  animatingButtonBlock: { backgroundColor: '#B31942', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 6, minWidth: 65, alignItems: 'center', justifyContent: 'center' },
  animatingButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 11, letterSpacing: 0.5 },

  quantityContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#B31942', borderRadius: 6, backgroundColor: '#FFF0F2', height: 28, overflow: 'hidden' },
  qtyControlBtn: { paddingHorizontal: 8, height: '100%', justifyContent: 'center', alignItems: 'center' },
  qtyCountLabel: { fontSize: 13, fontWeight: 'bold', color: '#B31942', paddingHorizontal: 4, minWidth: 16, textAlign: 'center' },
  boldIcon: { fontWeight: '900' },

  bottomTabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#FFF', flexDirection: 'row', borderTopWidth: 1, borderColor: '#E2E8F0', justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  tabLabel: { fontSize: 11, color: '#718096', marginTop: 4, fontWeight: '600' },
  activeTabLabel: { fontSize: 11, color: '#B31942', marginTop: 4, fontWeight: '600' },

  cartIconWrapper: { position: 'relative', padding: 2 },
  badgeNotificationBubble: { position: 'absolute', top: -5, right: -8, backgroundColor: '#E53E3E', borderRadius: 9, minWidth: 16, height: 16, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 3 },
  badgeText: { color: '#FFF', fontSize: 9, fontWeight: 'bold', textAlign: 'center' }
});