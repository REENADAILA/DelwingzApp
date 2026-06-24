import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
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

const BOTTOM_TABS = [
  { name: 'Home', icon: 'alpha-d-circle-outline', selected: true },
  { name: 'Categories', icon: 'grid', selected: false },
  { name: 'Survey', icon: 'clipboard-text-outline', selected: false },
  { name: 'Subscription', icon: 'calendar-month-outline', selected: false },
  { name: 'Cart', icon: 'cart-outline', selected: false },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const openCategories = () => navigation.navigate('Categories');
  const openProfile = () => navigation.navigate('Profile');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        
        <View style={styles.heroSection}>
          <View style={styles.headerRow}>
            <View style={styles.toggleContainer}><Text style={styles.whiteText}>Bulk Order</Text></View>
            <View style={styles.headerIcons}>
              <Icon name="magnify" size={24} color="#FFF" style={{ marginRight: 15 }} />
              <TouchableOpacity onPress={openProfile}>
                <Icon name="menu" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.centerItems}>
            <Text style={styles.badge}>LIMITED TIME OFFER</Text>
            <Text style={styles.mainTitle}>Flat 20% OFF</Text>
            <Text style={styles.subTitle}>On Your First 5 Orders</Text>
            
            <TouchableOpacity style={styles.whiteBtn} onPress={openCategories}>
              <Text style={styles.redBtnText}>Order Now ›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.outlineBtn} onPress={openCategories}>
              <Text style={styles.whiteText}>Explore Categories ›</Text>
            </TouchableOpacity>
            
            <Image source={require('../assets/image/HomePageCover.jpeg')} style={styles.heroImage} />
          </View>
        </View>

        <View style={styles.basePadding}>
          
          <View style={styles.featureCard}>
            <View style={styles.gridContainer}>
              {FEATURES_LIST.map((item, idx) => (
                <View key={idx} style={styles.gridItem}>
                  <Icon name={item.icon} size={24} color="#B71C1C" />
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
            <Text style={styles.viewAllText}>View All Categories  ›</Text>
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
          <Text style={styles.b2bTag}>+  B2B SOLUTIONS</Text>
          <Text style={styles.b2bHeading}>Business Solutions Available</Text>
          <Text style={styles.b2bSub}>Are you a restaurant, hotel, or catering service? Discover our bulk meat supply solutions.</Text>
          <TouchableOpacity style={styles.b2bButton}>
            <Text style={styles.b2bButtonText}>Explore B2B Solutions  ›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        {BOTTOM_TABS.map((tab, idx) => (
          <TouchableOpacity key={idx} style={styles.tab} onPress={() => navigation.navigate(tab.name)}>
            <Icon name={tab.icon} size={24} color={tab.selected ? '#B71C1C' : '#757575'} />
            <Text style={{ color: tab.selected ? '#B71C1C' : '#757575', fontSize: 11, marginTop: 2 }}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  heroSection: { backgroundColor: '#B71C1C', paddingBottom: 25,paddingTop: 25 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, marginTop: 10 },
  toggleContainer: { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 15, paddingHorizontal: 20, paddingVertical: 5 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  centerItems: { alignItems: 'center', marginTop: 15 },
  badge: { backgroundColor: '#FF9100', color: '#FFF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, fontSize: 11, fontWeight: 'bold' },
  mainTitle: { color: '#FFF', fontSize: 36, fontWeight: 'bold', marginTop: 5 },
  subTitle: { color: '#FFF', fontSize: 15, marginTop: 2, marginBottom: 15 },
  whiteBtn: { backgroundColor: '#FFF', paddingVertical: 10, paddingHorizontal: 45, borderRadius: 8, marginBottom: 10 },
  redBtnText: { color: '#B71C1C', fontWeight: 'bold' },
  outlineBtn: { borderWidth: 1, borderColor: '#FFF', paddingVertical: 10, paddingHorizontal: 35, borderRadius: 8 },
  whiteText: { color: '#FFF', fontWeight: 'bold' },
  heroImage: { width: width * 0.9, height: 200, resizeMode: 'contain', marginTop: 15 },
  basePadding: { padding: 15 },
  featureCard: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE', borderRadius: 12, padding: 15, marginBottom: 20 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 15 },
  gridItem: { alignItems: 'center', width: '48%' },
  featureTitle: { fontSize: 12, fontWeight: 'bold', color: '#000', marginTop: 5, textAlign: 'center' },
  featureSub: { fontSize: 10, color: '#666', textAlign: 'center' },
  sectionDivider: { color: '#B71C1C', textAlign: 'center', fontSize: 12, fontWeight: 'bold' },
  darkHeading: { fontSize: 22, fontWeight: 'bold', color: '#111', textAlign: 'center', marginTop: 5, marginBottom: 15 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  catBox: { width: '48%', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F0F0F0', borderRadius: 12, padding: 10, alignItems: 'center', marginBottom: 15 },
  catImage: { width: 90, height: 70, resizeMode: 'contain' },
  catText: { fontSize: 11, fontWeight: 'bold', color: '#333', marginTop: 5, textAlign: 'center' },
  viewAllBtn: { backgroundColor: '#B71C1C', paddingVertical: 12, borderRadius: 25, alignItems: 'center', marginVertical: 10 },
  viewAllText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  productCard: { width: '48%', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE', borderRadius: 12, padding: 10 },
  prodImage: { width: '100%', height: 100, borderRadius: 8, resizeMode: 'cover' },
  prodTitle: { fontSize: 13, fontWeight: 'bold', color: '#222', marginTop: 8 },
  prodWeight: { fontSize: 11, color: '#777', marginTop: 2 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  prodPrice: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  addBtn: { borderWidth: 1, borderColor: '#B71C1C', paddingHorizontal: 15, paddingVertical: 4, borderRadius: 6 },
  addText: { color: '#B71C1C', fontWeight: 'bold', fontSize: 12 },
  comingSoonBadge: { backgroundColor: '#FEF2F2', paddingVertical: 6, borderRadius: 6, alignItems: 'center', marginTop: 8, borderWidth: 1, borderColor: '#FEE2E2', width: '100%' },
  comingSoonText: { color: '#B71C1C', fontSize: 12, fontWeight: 'bold' },
  b2bContainer: { backgroundColor: '#111', padding: 25, marginTop: 15, alignItems: 'center' },
  b2bTag: { color: '#FF8A80', fontSize: 11, fontWeight: 'bold' },
  b2bHeading: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginTop: 5 },
  b2bSub: { color: '#AAA', fontSize: 13, textAlign: 'center', marginTop: 5, marginBottom: 15 },
  b2bButton: { backgroundColor: '#FFF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  b2bButtonText: { color: '#111', fontWeight: 'bold' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60, borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF' },
  tab: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});