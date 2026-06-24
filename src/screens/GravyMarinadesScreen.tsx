import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const GRAVY_PRODUCTS = [
  {
    id: 'gm1',
    name: 'Afghan Ka Pathan Chicken Tikka',
    weight: '165g',
    price: '900',
    oldPrice: '1000',
    discount: '10% OFF',
    image: require('../assets/image/GravyMarinades.jpeg'), 
  },
  {
    id: 'gm2',
    name: 'Cheesy Tomato Chicken Tikka',
    weight: '165g',
    price: '179',
    oldPrice: '199',
    discount: '10% OFF',
    image: require('../assets/image/KeralaCoconutCurryChickenGravy.jpeg'), 
  },
];

export default function GravyMarinadesScreen({ navigation }: any) {
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
            {/* Fixed the missing png path error with exact valid JPEG asset */}
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
          {GRAVY_PRODUCTS.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
            >
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>{product.discount}</Text>
              </View>

              <Image source={product.image} style={styles.productImg} resizeMode="cover" />
              
              <View style={styles.productInfoContainer}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.weightText}>{product.weight}</Text>
                
                <View style={styles.priceActionRow}>
                  <View>
                    <Text style={styles.currentPrice}>₹{product.price}</Text>
                    <Text style={styles.oldPrice}>₹{product.oldPrice}</Text>
                  </View>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>ADD</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 5. BOTTOM TAB BAR */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="grid" size={20} color="#B31942" />
          <Text style={styles.activeTabLabel}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="document-text-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Survey</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="calendar-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="cart-outline" size={20} color="#718096" />
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
  productInfoContainer: { padding: 12 },
  productName: { fontSize: 13, fontWeight: 'bold', color: '#1A202C', height: 36, lineHeight: 18 },
  weightText: { fontSize: 12, color: '#718096', marginTop: 4, marginBottom: 10 },
  priceActionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  currentPrice: { fontSize: 16, fontWeight: 'bold', color: '#1A202C' },
  oldPrice: { fontSize: 11, color: '#A0AEC0', textDecorationLine: 'line-through', marginTop: 1 },
  addButton: { borderWidth: 1, borderColor: '#B31942', paddingVertical: 4, paddingHorizontal: 14, borderRadius: 6 },
  addButtonText: { color: '#B31942', fontWeight: 'bold', fontSize: 12 },

  bottomTabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#FFF', flexDirection: 'row', borderTopWidth: 1, borderColor: '#E2E8F0', justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  tabLabel: { fontSize: 11, color: '#718096', marginTop: 4, fontWeight: '600' },
  activeTabLabel: { fontSize: 11, color: '#B31942', marginTop: 4, fontWeight: '600' }
});