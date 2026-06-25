import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WishlistContext } from '../context/WishlistContext'; 
import { CartContext } from '../context/CartContext'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import dbEngine from '../database/DatabaseEngine';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const WishlistScreen = () => {
  // ─── 🔴 STABILIZED TOP-LEVEL HOOK CALLS (NO INLINE CONDITIONAL TRAPS) ───
  const navigation = useNavigation<any>();
  const wishlistContextData = useContext(WishlistContext);
  const cartContextData = useContext(CartContext);

  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Safe reference extractions without disrupting the React call stack queue order
  const refreshWishlistFromSQL = wishlistContextData?.refreshWishlistFromSQL;
  const refreshCartFromSQL = cartContextData?.refreshCartFromSQL;

  const fetchWishlistItems = async () => {
    try {
      await dbEngine.initDatabase();
      const result = await dbEngine.execute("SELECT * FROM wishlist;", []);
      const tempItems = [];
      const initialQuantities: { [key: string]: number } = {};

      if (result && result.rows && result.rows.length > 0) {
        for (let i = 0; i < result.rows.length; i++) {
          const row = result.rows.item(i);
          const imageSource = isNaN(Number(row.image)) ? row.image : Number(row.image);

          let parsedVariants = [];
          if (row.variants) {
            try {
              parsedVariants = typeof row.variants === 'string' ? JSON.parse(row.variants) : row.variants;
            } catch (e) {
              parsedVariants = [];
            }
          }

          tempItems.push({
            id: row.id,
            title: row.title || row.name || 'Premium Meat Item',
            price: parseFloat(row.price) || 0,
            mrp: parseFloat(row.mrp) || 0,
            discount: row.discount || '10% OFF',
            selectedVariant: row.selectedVariant || '',
            variants: parsedVariants,
            image: imageSource,
          });

          initialQuantities[row.id] = 1;
        }
      }
      setWishlistItems(tempItems);
      setQuantities(initialQuantities);
      
      if (refreshWishlistFromSQL) {
        refreshWishlistFromSQL();
      }
    } catch (error) {
      console.log("Error loading wishlist items into screen view matrix:", error);
    }
  };

  // ─── STABILIZED EFFECT BOUND TO CORE NAVIGATION OBJECTS ───
  useEffect(() => {
    fetchWishlistItems();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchWishlistItems();
    });

    return unsubscribe;
  }, [navigation]);

  const removeFromWishlist = async (id: string) => {
    try {
      await dbEngine.initDatabase();
      await dbEngine.execute("DELETE FROM wishlist WHERE id = ?;", [id]);
      fetchWishlistItems();
    } catch (error) {
      console.log("Error removing item from SQLite table row:", error);
    }
  };

  const handleQuantityChange = (id: string, type: 'inc' | 'dec') => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;
      if (type === 'dec' && currentQty <= 1) return prev;
      return { ...prev, [id]: type === 'inc' ? currentQty + 1 : currentQty - 1 };
    });
  };

  const handleAddToCart = async (item: any) => {
    const itemQty = quantities[item.id] || 1;
    const itemSize = item.selectedVariant || (item.variants && item.variants[0]) || '250g';

    try {
      await dbEngine.initDatabase();
      const checkResult = await dbEngine.execute("SELECT qty FROM cart WHERE id = ?;", [item.id]);

      if (checkResult && checkResult.rows && checkResult.rows.length > 0) {
        const currentQty = checkResult.rows.item(0).qty;
        await dbEngine.execute(
          "UPDATE cart SET qty = ?, size = ?, price = ? WHERE id = ?;", 
          [currentQty + itemQty, itemSize, item.price, item.id]
        );
      } else {
        await dbEngine.execute(
          "INSERT INTO cart (id, name, price, size, qty, image, description, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
          [
            item.id,
            item.title,
            item.price,
            itemSize,
            itemQty,
            String(item.image),
            'Premium product added from your saved wishlist configuration.',
            4.8
          ]
        );
      }

      if (refreshCartFromSQL) {
        refreshCartFromSQL();
      }

      navigation.navigate('Cart');
    } catch (error) {
      console.log("Error pushing custom item from wishlist loop directly into cart table row:", error);
    }
  };

  const handleCardNavigation = (id: string) => {
    if (id === 'rc1') {
      navigation.navigate('RawChickenKeemaDetail');
    } else if (id === 'tk1') {
      navigation.navigate('AfganKaPathanChickenTikka');
    } else {
      navigation.navigate('Home');
    }
  };

  const renderProductCard = ({ item }: { item: any }) => {
    const currentQty = quantities[item.id] || 1;

    return (
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.95} 
        onPress={() => handleCardNavigation(item.id)}
      >
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image 
              source={typeof item.image === 'number' ? item.image : { uri: item.image }} 
              style={styles.productImage} 
              resizeMode="cover" 
            />
          ) : (
            <View style={[styles.productImage, styles.placeholderImageBg]}>
              <Ionicon name="image-outline" size={30} color="#ccc" />
            </View>
          )}

          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={() => removeFromWishlist(item.id)}
            activeOpacity={0.7}
          >
            <Icon name="close" size={16} color="#444" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
          
          <View style={styles.variantContainer}>
            {item.variants && item.variants.map((v: string, index: number) => {
              const isSelected = item.selectedVariant === v || index === 0;
              return (
                <View
                  key={index}
                  style={[
                    styles.variantBadge,
                    isSelected ? styles.variantActive : styles.variantInactive,
                  ]}
                >
                  <Text style={isSelected ? styles.variantTextActive : styles.variantTextInactive}>
                    📦 {v}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.priceRow}>
            <View style={styles.priceColumn}>
              <Text style={styles.priceText}>₹{item.price}</Text>
              <Text style={styles.mrpText}>MRP: ₹{item.mrp}</Text>
            </View>

            <View style={styles.rightActionControlsBlock}>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => handleQuantityChange(item.id, 'dec')}>
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{currentQty}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => handleQuantityChange(item.id, 'inc')}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.innerAddToCartBtn} 
                onPress={() => handleAddToCart(item)}
                activeOpacity={0.8}
              >
                <Icon name="cart-plus" size={14} color="#FFF" />
                <Text style={styles.innerAddToCartBtnTxt}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyHeartCircle}>
        <Icon name="heart-outline" size={40} color="#B31942" />
      </View>
      <Text style={styles.emptyTitle}>Your Wishlist is Empty!</Text>
      <Text style={styles.emptySubtitle}>
        Seems like you haven't added any premium meats or items to your wishlist yet.
      </Text>
      <TouchableOpacity 
        style={styles.exploreBtn} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.exploreBtnText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBarStatic}>
        <View style={styles.headerLeftTitleRow}>
          <TouchableOpacity style={styles.backArrowHitbox} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#800A26" />
          </TouchableOpacity>
          <Text style={styles.cartHeaderTitle}>My Wishlist</Text>
        </View>
        <Text style={styles.headerSavedSubtitle}>{wishlistItems.length} items saved</Text>
      </View>

      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductCard}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContent, 
          wishlistItems.length === 0 && styles.centerEmptyList
        ]}
        ListFooterComponent={
          wishlistItems.length > 0 ? (
            <View style={styles.footerContainer}>
              <Text style={styles.exploreText}>Want to explore more products?</Text>
              <TouchableOpacity 
                style={styles.continueBtn}
                onPress={() => navigation.navigate('Categories')}
              >
                <Text style={styles.continueBtnText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F6' },
  listContent: { paddingBottom: 40, paddingTop: 6 },
  centerEmptyList: { flexGrow: 1, justifyContent: 'center' },
  headerBarStatic: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#FFE4E6', backgroundColor: '#FFF', marginTop: 40 },
  headerLeftTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backArrowHitbox: { padding: 2, marginRight: 2 },
  cartHeaderTitle: { fontSize: 18, fontWeight: '800', color: '#2D0A13' },
  headerSavedSubtitle: { fontSize: 12, color: '#718096', fontWeight: '600' },
  card: { backgroundColor: '#fff', marginHorizontal: 14, marginBottom: 12, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: '#FFE4E6', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 1.5 },
  imageContainer: { position: 'relative', width: '100%', height: 155 },
  productImage: { width: '100%', height: '100%' },
  placeholderImageBg: { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' },
  discountBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: '#38A169', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 5 },
  discountText: { color: '#fff', fontWeight: 'bold', fontSize: 10 },
  removeButton: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(255,255,255,0.9)', width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  detailsContainer: { padding: 12 },
  productTitle: { fontSize: 14, fontWeight: '700', color: '#1A202C', marginBottom: 6, lineHeight: 18 },
  variantContainer: { flexDirection: 'row', gap: 6, marginBottom: 10 },
  variantBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1 },
  variantActive: { backgroundColor: '#FFF5F6', borderColor: '#B31942' },
  variantInactive: { backgroundColor: '#F5F5F5', borderColor: '#E2E8F0' },
  variantTextActive: { color: '#B31942', fontWeight: '700', fontSize: 11 },
  variantTextInactive: { color: '#718096', fontSize: 11, fontWeight: '500' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  priceColumn: { flexDirection: 'column' },
  priceText: { fontSize: 18, fontWeight: '800', color: '#1A202C' },
  mrpText: { fontSize: 11, color: '#A0AEC0', textDecorationLine: 'line-through', marginTop: 0 },
  rightActionControlsBlock: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#B31942', borderRadius: 8, overflow: 'hidden', height: 28 },
  qtyBtn: { backgroundColor: '#FFF5F6', paddingHorizontal: 10, justifyContent: 'center', height: '100%' },
  qtyBtnText: { color: '#B31942', fontSize: 14, fontWeight: 'bold' },
  qtyText: { paddingHorizontal: 8, fontWeight: 'bold', fontSize: 12, color: '#1A202C', minWidth: 18, textAlign: 'center' },
  innerAddToCartBtn: { backgroundColor: '#A10E33', flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, height: 28, borderRadius: 8, justifyContent: 'center' },
  innerAddToCartBtnTxt: { color: '#FFF', fontWeight: '700', fontSize: 12 },
  footerContainer: { alignItems: 'center', marginTop: 20, paddingHorizontal: 16 },
  exploreText: { fontSize: 13, color: '#4A5568', marginBottom: 10, fontWeight: '600' },
  continueBtn: { backgroundColor: '#A10E33', width: '100%', padding: 12, borderRadius: 10, alignItems: 'center' },
  continueBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingBottom: SCREEN_HEIGHT * 0.05 },
  emptyHeartCircle: { backgroundColor: '#FFF0F2', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 14, borderWidth: 1, borderColor: '#FFE4E6' },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#2D0A13', marginBottom: 6, textAlign: 'center' },
  emptySubtitle: { fontSize: 13, color: '#718096', textAlign: 'center', lineHeight: 18, marginBottom: 20 },
  exploreBtn: { backgroundColor: '#A10E33', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 18 },
  exploreBtnText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
});