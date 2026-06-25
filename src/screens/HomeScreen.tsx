import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const FEATURES_LIST = [
  { icon: 'food-meat', title: 'Fresh Cuts', sub: 'Daily handpicked' },
  { icon: 'shield-check-outline', title: 'Hygienic Processing', sub: '100% safe & clean' },
  { icon: 'snowflake', title: 'Cold Chain Delivery', sub: 'Maintains freshness' },
  { icon: 'check-decagram-outline', title: 'Quality Assured', sub: 'Premium farm quality' },
];

const CATEGORIES_LIST = [
  { name: 'RAW CHICKEN', img: require('../assets/image/RawChicken.jpeg') },
  { name: 'TIKKA MARINADES', img: require('../assets/image/TikkaMarinades.jpeg') },
  { name: 'GRAVY MARINADES', img: require('../assets/image/GravyMarinades.jpeg') },
];

const ACTIVE_PRODUCTS = [
  { id: '1', title: 'Raw Whole Chicken', weight: '250g', price: '₹90', img: require('../assets/image/HomePageCover.jpeg') },
  { id: '2', title: 'Raw Chicken Keema', weight: '250g', price: '₹90', img: require('../assets/image/RawChickenKima.jpeg') },
];

const UPCOMING_PRODUCTS = [
  { id: '3', title: 'Kerala Coconut Curry', img: require('../assets/image/KeralaCoconutCurryChickenGravy.jpeg') },
  { id: '4', title: 'Afghan Ka Pathan', img: require('../assets/image/AfganKaPathanChickenTikka.jpeg') },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [isBulkOrder, setIsBulkOrder] = useState(false);

  const openCategories = () => navigation.navigate('Categories');
  const openProfile = () => navigation.navigate('Profile');

  return (
    <View style={styles.container}>
      
      {/* 🔴 EXACT NAVBAR STYLING COPIED FROM TOPNAVBAR */}
      <View style={styles.heroSection}>
        <View style={styles.navbarContainer}>
          <Text style={styles.logoText}>Delwingz</Text>

          <View style={styles.toggleContainer}>
            <Switch
              trackColor={{ false: '#767577', true: '#E63946' }}
              thumbColor={isBulkOrder ? '#FFF' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => setIsBulkOrder(value)}
              value={isBulkOrder}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
            <Text style={styles.toggleText}>Bulk Order</Text>
          </View>

          <View style={styles.iconGroup}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="magnify" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={openProfile}>
              <Icon name="menu" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* MAIN SCROLLABLE BODY */}
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        
        {/* HERO BANNER CONTENT CONTAINER */}
        <View style={styles.heroContentSection}>
          <View style={styles.centerItems}>
            <View style={styles.orangeOfferBadge}>
              <Text style={styles.orangeOfferBadgeTxt}>LIMITED TIME OFFER</Text>
            </View>
            <Text style={styles.mainTitle}>Flat 20% OFF</Text>
            <Text style={styles.subTitle}>On Your First 5 Orders</Text>
            
            <TouchableOpacity style={styles.whiteBtn} onPress={openCategories} activeOpacity={0.9}>
              <Text style={styles.redBtnText}>Order Now  ›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.outlineBtn} onPress={openCategories} activeOpacity={0.8}>
              <Text style={styles.whiteText}>Explore Categories  ›</Text>
            </TouchableOpacity>
            
            <Image source={require('../assets/image/HomePageCover.jpeg')} style={styles.heroImage} />
          </View>
          
          {/* Curved boundary styling */}
          <View style={styles.wavyCurveBottomLayer} />
        </View>

        <View style={styles.basePadding}>
          <View style={styles.featureCard}>
            <View style={styles.gridContainer}>
              {FEATURES_LIST.map((item, idx) => (
                <View key={idx} style={styles.gridItem}>
                  <Icon name={item.icon} size={24} color="#80001D" />
                  <Text style={styles.featureTitle}>{item.title}</Text>
                  <Text style={styles.featureSub}>{item.sub}</Text>
                </View>
              ))}
            </View>
          </View>

          <Text style={styles.sectionDivider}>— Shop By Categories —</Text>
          <Text style={styles.darkHeading}>Freshest Meats Just For You</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES_LIST.map((cat, idx) => (
              <TouchableOpacity key={idx} style={styles.catBox} onPress={openCategories}>
                <Image source={cat.img} style={styles.catImage} />
                <Text style={styles.catText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.viewAllBtn} onPress={openCategories}>
            <Text style={styles.viewAllText}>View All Categories   ›</Text>
          </TouchableOpacity>

          <Text style={[styles.sectionDivider, { marginTop: 30 }]}>— Fresh & Premium —</Text>
          <Text style={styles.darkHeading}>Fresh Farm Chicken</Text>
          <View style={styles.productRow}>
            {ACTIVE_PRODUCTS.map(product => (
              <View key={product.id} style={styles.productCard}>
                <Image source={product.img} style={styles.prodImage} />
                <Text style={styles.prodTitle}>{product.title}</Text>
                <Text style={styles.prodWeight}>{product.weight}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.prodPrice}>{product.price}</Text>
                  <TouchableOpacity style={styles.addBtn}><Text style={styles.addText}>ADD</Text></TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <Text style={[styles.sectionDivider, { marginTop: 30 }]}>— Upcoming Products —</Text>
          <Text style={styles.darkHeading}>Coming Soon - Exciting New Products!</Text>
          <View style={styles.productRow}>
            {UPCOMING_PRODUCTS.map(product => (
              <View key={product.id} style={styles.productCard}>
                <Image source={product.img} style={styles.prodImage} />
                <Text style={styles.prodTitle}>{product.title}</Text>
                <View style={styles.comingSoonBadge}><Text style={styles.comingSoonText}>Coming Soon</Text></View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.b2bContainer}>
          <Text style={styles.b2bTag}>+   B2B SOLUTIONS</Text>
          <Text style={styles.b2bHeading}>Business Solutions Available</Text>
          <Text style={styles.b2bSub}>Are you a restaurant, hotel, or catering service? Discover our bulk meat supply solutions.</Text>
          <TouchableOpacity style={styles.b2bButton}>
            <Text style={styles.b2bButtonText}>Explore B2B Solutions   ›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM TAB BAR COMPONENT */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={22} color="#B31942" />
          <Text style={styles.activeTabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Categories')}>
          <Icon name="grid" size={22} color="#718096" />
          <Text style={styles.tabLabel}>Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Survey')}>
          <Icon name="clipboard-text" size={22} color="#718096" />
          <Text style={styles.tabLabel}>Survey</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Subscription')}>
          <Icon name="calendar-month-outline" size={22} color="#718096" />
          <Text style={styles.tabLabel}>Subscription</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart-outline" size={22} color="#718096" />
          <Text style={styles.tabLabel}>Cart</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF2F4' },
  
  // ─── 🔴 TOP FIXED BLOCK INTEGRATING EXACT TOPNAVBAR LAYOUT STYLE ───
  heroSection: { 
    backgroundColor: '#80001D', // Base top red backdrop tone
    paddingTop: 50, 
    paddingBottom: 15,
    zIndex: 10 
  },
  navbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Whitish translucent blend tint
    marginHorizontal: 12,
    borderRadius: 25,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)', // Thin translucent glassy line border
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    fontStyle: 'italic',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  toggleText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 6,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
    padding: 4,
  },

  // ─── HERO CONTENT TOUCHING TOP SEAMLESSLY ───
  heroContentSection: { 
    backgroundColor: '#80001D', 
    paddingBottom: 40, 
    paddingTop: 10, 
    position: 'relative' 
  },
  centerItems: { alignItems: 'center', zIndex: 2 },
  orangeOfferBadge: { backgroundColor: '#FF9E00', paddingHorizontal: 16, paddingVertical: 5, borderRadius: 16 },
  orangeOfferBadgeTxt: { color: '#FFF', fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  mainTitle: { color: '#FFF', fontSize: 44, fontWeight: '900', marginTop: 10, letterSpacing: -0.5 },
  subTitle: { color: '#FFB8C6', fontSize: 15, fontWeight: '600', marginTop: 4, marginBottom: 20 },
  whiteBtn: { backgroundColor: '#FFF', width: width * 0.45, height: 42, borderRadius: 8, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3, elevation: 3 },
  redBtnText: { color: '#80001D', fontWeight: '800', fontSize: 14 },
  outlineBtn: { borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)', width: width * 0.54, height: 42, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  whiteText: { color: '#FFF', fontWeight: '800', fontSize: 14 },
  heroImage: { width: width * 0.82, height: 180, resizeMode: 'contain', marginTop: 20 },
  wavyCurveBottomLayer: { position: 'absolute', bottom: -1, left: 0, right: 0, height: 20, backgroundColor: '#FFF2F4', borderTopLeftRadius: 30, borderTopRightRadius: 30 },

  basePadding: { padding: 15 },
  featureCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 15, marginBottom: 20, elevation: 5, shadowColor: '#80001D', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 15, marginTop: -35 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 15 },
  gridItem: { alignItems: 'center', width: '48%' },
  featureTitle: { fontSize: 12, fontWeight: 'bold', color: '#1E293B', marginTop: 5, textAlign: 'center' },
  featureSub: { fontSize: 10, color: '#64748B', textAlign: 'center' },
  sectionDivider: { color: '#80001D', textAlign: 'center', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  darkHeading: { fontSize: 22, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginTop: 5, marginBottom: 15 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  catBox: { width: '48%', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 10, alignItems: 'center', marginBottom: 15, shadowColor: '#80001D', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  catImage: { width: 90, height: 70, resizeMode: 'contain' },
  catText: { fontSize: 11, fontWeight: 'bold', color: '#1E293B', marginTop: 5, textAlign: 'center' },
  viewAllBtn: { backgroundColor: '#80001D', paddingVertical: 12, borderRadius: 25, alignItems: 'center', marginVertical: 10 },
  viewAllText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  productCard: { width: '48%', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 10 },
  prodImage: { width: '100%', height: 100, borderRadius: 8, resizeMode: 'cover' },
  prodTitle: { fontSize: 13, fontWeight: 'bold', color: '#1E293B', marginTop: 8 },
  prodWeight: { fontSize: 11, color: '#64748B', marginTop: 2 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  prodPrice: { fontSize: 14, fontWeight: 'bold', color: '#1E293B' },
  addBtn: { borderWidth: 1, borderColor: '#800D26', paddingHorizontal: 15, paddingVertical: 4, borderRadius: 6 },
  addText: { color: '#800D26', fontWeight: 'bold', fontSize: 12 },
  comingSoonBadge: { backgroundColor: '#FEF2F2', paddingVertical: 6, borderRadius: 6, alignItems: 'center', marginTop: 8, borderWidth: 1, borderColor: '#FEE2E2', width: '100%' },
  comingSoonText: { color: '#80001D', fontSize: 12, fontWeight: 'bold' },
  b2bContainer: { backgroundColor: '#1E293B', padding: 25, marginTop: 15, alignItems: 'center' },
  b2bTag: { color: '#FF8A80', fontSize: 11, fontWeight: 'bold' },
  b2bHeading: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginTop: 5 },
  b2bSub: { color: '#94A3B8', fontSize: 13, textAlign: 'center', marginTop: 5, marginBottom: 15 },
  b2bButton: { backgroundColor: '#FFF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  b2bButtonText: { color: '#1E293B', fontWeight: 'bold' },

  bottomTabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60, borderTopWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#FFF' },
  tabItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabLabel: { color: '#718096', fontSize: 11, marginTop: 2, fontWeight: '500' },
  activeTabLabel: { color: '#B31942', fontSize: 11, marginTop: 2, fontWeight: '700' },
});