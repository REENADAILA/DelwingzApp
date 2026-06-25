import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CartContext } from '../context/CartContext'; 
import { WishlistContext } from '../context/WishlistContext'; 
import dbEngine from '../database/DatabaseEngine';

const { width } = Dimensions.get('window');

// 🟢 AFGHANI CHICKEN TIKKA SPECIFIC OPTIONS & DATA
const SIZE_OPTIONS = [
  { label: '400g', price: 260, mrp: 299, discount: '13% OFF' },
  { label: '200g', price: 140, mrp: 165, discount: '15% OFF' },
];

const MARKET_CHICKEN_BAD = [
  'Artificial heavy cream substitutes used',
  'Watery or loose texture that runs off the grills',
  'Chewy, rubbery chicken pieces after cooking',
  'Unevenly layered spices with bland core layers',
  'No cold chain packaging — quick spoilage risk',
];

const DELWINGZ_ADVANTAGE = [
  '100% real cashew paste & pure fresh cream',
  'Thick, velvety malai marinade that wraps tightly',
  'Deeply pierced cuts for an ultra-juicy core melt',
  'Master chef blend of green cardamom & white pepper',
  'Temperature-controlled cold chain process protection',
];

const COOKING_STEPS = [
  'Thaw under refrigeration completely before cooking.',
  'Preheat oven/air-fryer to 180°C or use a non-stick pan with butter.',
  'Cook/Grill for 12-14 minutes, basting with extra butter occasionally.',
  'Garnish with a pinch of chat masala and serve hot with fresh onions.',
];

const NUTRITION_LIST = [
  { name: 'PROTEIN', value: '17.8 g' },
  { name: 'CALORIES', value: '185 kcal' },
  { name: 'CARBOHYDRATES', value: '2.4 g' },
  { name: 'FAT', value: '11.5 g' },
  { name: 'CHOLESTEROL', value: '92 mg' },
];

export default function AfganKaPathanChickenTikkaScreen({ navigation }: any) {
  
  // ─── 🔴 TOP LEVEL HOOKS DECLARATION (NO CONDITIONAL TRAPS) ───
  const cartContextData = useContext(CartContext);
  const wishlistContextData = useContext(WishlistContext);

  const [selectedSize, setSelectedSize] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Safe parameters extraction layer
  const refreshCartFromSQL = cartContextData?.refreshCartFromSQL || null;
  const refreshWishlistFromSQL = wishlistContextData?.refreshWishlistFromSQL || null;
  const activeOption = SIZE_OPTIONS[selectedSize];

  const productId = 'tk1'; // Unique ID mapping configuration
  const productName = 'Afghan Ka Pathan Chicken Tikka';
  const productDesc = 'Boneless chunks marinated deeply in a velvety rich texture of fresh cream, pure cashew paste, and aromatic green cardamoms.';

  // ─── SCAN WISHLIST SCHEMA STATUS ON NAVIGATION FOCUS ───
  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        await dbEngine.initDatabase();
        const result = await dbEngine.execute("SELECT id FROM wishlist WHERE id = ?;", [productId]);
        if (result && result.rows && result.rows.length > 0) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (err) {
        console.log("Error scanning local wishlist rows for afghani tikka:", err);
      }
    };

    const unsubscribe = navigation.addListener('focus', checkWishlistStatus);
    checkWishlistStatus();
    return unsubscribe;
  }, [navigation]);

  // 🛒 ADD TO CART HANDLER
  const handleAfghaniAddToCart = async () => {
    try {
      await dbEngine.initDatabase();

      // Check current presence records inside SQLite row matrix
      const checkResult = await dbEngine.execute("SELECT qty FROM cart WHERE id = ?;", [productId]);

      if (checkResult && checkResult.rows && checkResult.rows.length > 0) {
        const currentQty = checkResult.rows.item(0).qty;
        await dbEngine.execute(
          "UPDATE cart SET qty = ?, size = ?, price = ? WHERE id = ?;", 
          [currentQty + 1, activeOption.label, activeOption.price, productId]
        );
      } else {
        await dbEngine.execute(
          "INSERT INTO cart (id, name, price, size, qty, image, description, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
          [
            productId,
            productName,
            activeOption.price,
            activeOption.label,
            1,
            String(require('../assets/image/AfganKaPathanChickenTikka.jpeg')),
            productDesc,
            4.8
          ]
        );
      }

      if (refreshCartFromSQL) {
        refreshCartFromSQL();
      }

      navigation.navigate('Cart');
    } catch (error) {
      console.log("Error inserting afghani tikka layout logs into DB stack layer:", error);
    }
  };

  // 💖 SILENT WISHLIST TOGGLE BACKGROUND MACHINE (NO REDIRECTION)
  const handleAddToWishlist = async () => {
    try {
      await dbEngine.initDatabase();

      if (isLiked) {
        await dbEngine.execute("DELETE FROM wishlist WHERE id = ?;", [productId]);
        setIsLiked(false);
      } else {
        const wishlistProductItem = {
          id: productId,
          title: productName,
          name: productName,
          price: activeOption.price,
          mrp: activeOption.mrp,
          discount: activeOption.discount,
          selectedVariant: activeOption.label,
          variants: SIZE_OPTIONS.map(opt => opt.label),
          image: String(require('../assets/image/AfganKaPathanChickenTikka.jpeg')), 
        };

        await dbEngine.addToWishlist(wishlistProductItem);
        setIsLiked(true);
      }

      if (refreshWishlistFromSQL) {
        refreshWishlistFromSQL();
      }
    } catch (error) {
      console.log("Error toggling wishlist row for afghani chicken tikka:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* APP HEADER */}
      <View style={styles.appHeader}>
        <Text style={styles.brandLogo}>Delwingz</Text>
        <View style={styles.headerRightIcons}>
          <View style={styles.toggleContainer}><Text style={styles.toggleText}>Bulk Order</Text></View>
          <TouchableOpacity style={styles.iconBtn}><Icon name="magnify" size={22} color="#333" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Profile')}><Icon name="menu" size={26} color="#333" /></TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
        {/* BREADCRUMBS */}
        <View style={styles.breadcrumbRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.breadText}>Home </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.breadText}> ›  Marinades  ›  </Text>
          </TouchableOpacity>
          <Text style={styles.breadActive}>Afgan Ka Pathan Tikka</Text>
        </View>

        {/* MAIN PRODUCT IMAGE */}
        <Image source={require('../assets/image/AfganKaPathanChickenTikka.jpeg')} style={styles.mainProductImage} />

        {/* BLACK INFO CARD */}
        <View style={styles.infoCard}>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>{productName}</Text>
          </View>
          
          <View style={styles.descBox}>
            <Text style={styles.descText} numberOfLines={3}>
              Experience royal indulgence with our Afgan Ka Pathan Chicken Tikka. Boneless chunks marinated deeply in a velvety rich texture of fresh cream, pure cashew paste, and aromatic green cardamoms.
            </Text>
            <TouchableOpacity><Text style={styles.readMoreText}>READ MORE ↓</Text></TouchableOpacity>
          </View>

          <Text style={styles.sectionLabel}>SELECT SIZE</Text>
          <View style={styles.sizeGrid}>
            {SIZE_OPTIONS.map((opt, idx) => {
              const isSelected = selectedSize === idx;
              return (
                <TouchableOpacity 
                  key={idx} 
                  style={[styles.sizeBox, isSelected ? styles.sizeBoxActive : styles.sizeBoxInactive]} 
                  onPress={() => setSelectedSize(idx)}
                >
                  <Text style={isSelected ? styles.sizeLabelActive : styles.sizeLabelInactive}>{opt.label}</Text>
                  <Text style={isSelected ? styles.sizePriceActive : styles.sizePriceInactive}>₹{opt.price}</Text>
                  <Text style={styles.sizeMrp}>₹{opt.mrp}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* PRICE ROW */}
          <View style={styles.mainPriceRow}>
            <Text style={styles.boldPriceText}>₹{activeOption?.price}</Text>
            <Text style={styles.mrpText}>MRP: ₹{activeOption?.mrp}</Text>
            <View style={styles.discountBadge}><Text style={styles.discountText}>{activeOption?.discount}</Text></View>
          </View>

          {/* ACTION BUTTONS WITH BACKGROUND SAFE TOGGLE CONTROLLER WIRE RESOLVED */}
          <View style={styles.actionBtnRow}>
            <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.8} onPress={handleAfghaniAddToCart}>
              <Icon name="cart-outline" size={20} color="#000" style={{ marginRight: 8 }} />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.wishlistBtn} activeOpacity={0.8} onPress={handleAddToWishlist}>
              <Icon 
                name={isLiked ? "heart" : "heart-outline"} 
                size={22} 
                color={isLiked ? "#EF4444" : "#FFF"} 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.subscribeBtn}>
            <Icon name="calendar-month-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>

        {/* WHY DELWINGZ */}
        <Text style={styles.whyTitle}>Why Delwingz?</Text>
        
        {/* MARKET CHICKEN BAD CARDS */}
        <View style={styles.whiteCardContainer}>
          <View style={styles.cardHeaderRow}>
            <Icon name="store" size={20} color="#B31942" />
            <Text style={styles.cardHeaderTitle}>Market Afghani Tikka</Text>
          </View>
          {MARKET_CHICKEN_BAD.map((text, i) => (
            <View key={i} style={styles.bulletRow}>
              <Icon name="close-circle-outline" size={18} color="#E53E3E" style={{ marginRight: 10 }} />
              <Text style={styles.bulletText}>{text}</Text>
            </View>
          ))}
        </View>

        {/* DELWINGZ ADVANTAGE GOOD CARDS */}
        <View style={[styles.whiteCardContainer, { backgroundColor: '#FFF0F2', borderColor: '#FFE4E6' }]}>
          <View style={styles.cardHeaderRow}>
            <Icon name="shield-check" size={20} color="#B31942" />
            <Text style={styles.cardHeaderTitle}>Delwingz Advantage</Text>
          </View>
          {DELWINGZ_ADVANTAGE.map((text, i) => (
            <View key={i} style={styles.bulletRow}>
              <Icon name="check-circle-outline" size={18} color="#38A169" style={{ marginRight: 10 }} />
              <Text style={styles.bulletText}>{text}</Text>
            </View>
          ))}
        </View>

        {/* COOKING & NUTRITION SECTION */}
        <Text style={styles.whyTitle}>Cooking & Nutrition</Text>
        
        {/* HOW TO COOK */}
        <View style={styles.burgundyCard}>
          <View style={styles.burgundyHeader}>
            <Text style={styles.burgundyTag}>PREPARATION GUIDE</Text>
            <Text style={styles.burgundyTitle}>How to Cook</Text>
          </View>
          <View style={styles.burgundyBody}>
            {COOKING_STEPS.map((step, idx) => (
              <View key={idx} style={styles.stepRow}>
                <View style={styles.stepNumberBadge}><Text style={styles.stepNumberText}>{idx + 1}</Text></View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* NUTRITIONAL VALUES */}
        <View style={styles.burgundyCard}>
          <View style={styles.burgundyHeader}>
            <Text style={styles.burgundyTag}>PER 100G • APPROX.</Text>
            <Text style={styles.burgundyTitle}>Nutritional Values</Text>
          </View>
          <View style={styles.burgundyBody}>
            {NUTRITION_LIST.map((nut, i) => (
              <View key={i} style={styles.nutritionRow}>
                <Text style={styles.nutName}>{nut.name}</Text>
                <Text style={styles.nutValue}>{nut.value}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollPadding: { paddingBottom: 50 },
  appHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#EEE' },
  brandLogo: { fontSize: 22, fontWeight: 'bold', color: '#B31942', fontStyle: 'italic' },
  headerRightIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleContainer: { backgroundColor: '#FFF0F2', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FFE4E6' },
  toggleText: { fontSize: 12, fontWeight: '700', color: '#B31942' },
  iconBtn: { padding: 4 },
  breadcrumbRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 12 },
  breadText: { color: '#718096', fontSize: 12 },
  breadActive: { color: '#B31942', fontSize: 12, fontWeight: 'bold' },
  mainProductImage: { width: width, height: 260, resizeMode: 'cover', marginTop: 10 },
  infoCard: { backgroundColor: '#111', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, marginTop: -20 },
  titleRow: { flexDirection: 'column', alignItems: 'flex-start' },
  productTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  descBox: { backgroundColor: '#222', padding: 12, borderRadius: 12, marginTop: 15 },
  descText: { color: '#AAA', fontSize: 13, lineHeight: 18 },
  readMoreText: { color: '#B71C1C', fontWeight: 'bold', fontSize: 11, marginTop: 5 },
  sectionLabel: { color: '#718096', fontSize: 11, fontWeight: 'bold', letterSpacing: 0.8, marginTop: 20, marginBottom: 10 },
  sizeGrid: { flexDirection: 'row', gap: 12 },
  sizeBox: { flex: 1, borderRadius: 12, padding: 12, borderWidth: 1, alignItems: 'center' },
  sizeBoxActive: { backgroundColor: '#B31942', borderColor: '#B31942' },
  sizeBoxInactive: { backgroundColor: '#222', borderColor: '#333' },
  sizeLabelActive: { color: '#FFF', fontSize: 12 },
  sizeLabelInactive: { color: '#AAA', fontSize: 12 },
  sizePriceActive: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginTop: 2 },
  sizePriceInactive: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginTop: 2 },
  sizeMrp: { color: '#666', fontSize: 11, textDecorationLine: 'line-through' },
  mainPriceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  boldPriceText: { color: '#FFF', fontSize: 32, fontWeight: 'bold', marginRight: 10 },
  mrpText: { color: '#666', textDecorationLine: 'line-through', fontSize: 14, marginRight: 15 },
  discountBadge: { backgroundColor: '#28A745', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  discountText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  actionBtnRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  addToCartBtn: { flex: 1, backgroundColor: '#FFF', paddingVertical: 14, borderRadius: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  addToCartText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  wishlistBtn: { width: 50, backgroundColor: '#222', borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  subscribeBtn: { backgroundColor: '#B31942', paddingVertical: 14, borderRadius: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12 },
  subscribeText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  whyTitle: { fontSize: 20, fontWeight: 'bold', color: '#800A26', marginHorizontal: 16, marginTop: 30, marginBottom: 10 },
  whiteCardContainer: { backgroundColor: '#FFF', marginHorizontal: 16, borderRadius: 16, padding: 16, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, borderColor: '#F7FAFC', paddingBottom: 8 },
  cardHeaderTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A202C', marginLeft: 10 },
  bulletRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  bulletText: { color: '#4A5568', fontSize: 13, flex: 1 },
  burgundyCard: { backgroundColor: '#FFF', marginHorizontal: 16, borderRadius: 16, overflow: 'hidden', marginBottom: 15, borderWidth: 1, borderColor: '#FFE4E6' },
  burgundyHeader: { backgroundColor: '#800A26', padding: 15 },
  burgundyTag: { color: '#FFB8C6', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },
  burgundyTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginTop: 2 },
  burgundyBody: { padding: 15 },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  stepNumberBadge: { backgroundColor: '#FFF0F2', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: '#FFE4E6' },
  stepNumberText: { color: '#B31942', fontWeight: 'bold', fontSize: 12 },
  stepText: { color: '#2D3748', fontSize: 13, flex: 1 },
  nutritionRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#F7FAFC' },
  nutName: { color: '#718096', fontSize: 12, fontWeight: 'bold' },
  nutValue: { color: '#1A202C', fontSize: 14, fontWeight: 'bold' },
});