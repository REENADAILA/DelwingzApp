import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// 🟢 TIKKA MARINADES SPECIFIC OPTIONS & DATA
const SIZE_OPTIONS = [
  { label: '400g', price: 240, mrp: 270, discount: '11% OFF' },
  { label: '200g', price: 130, mrp: 150, discount: '13% OFF' },
];

const MARKET_CHICKEN_BAD = [
  'Stale or artificial preservatives used',
  'Unpredictable spice levels per batch',
  'Watery marinade that drops off meat',
  'Inconsistent coating & bland core',
  'No temperature-controlled packing',
];

const DELWINGZ_ADVANTAGE = [
  '100% natural spices — zero chemicals',
  'Predictable, chef-crafted signature taste',
  'Thick, rich yogurt-based uniform coating',
  'Deeply marinated for juicy, tender core',
  'Temperature-controlled cold chain safety',
];

const COOKING_STEPS = [
  'Thaw completely under refrigeration before cooking.',
  'Preheat your oven/tandoor to 200°C or heat a pan with little oil.',
  'Grill or pan-fry for 12-15 minutes, turning occasionally.',
  'Serve hot with mint chutney and lemon wedges.',
];

const NUTRITION_LIST = [
  { name: 'PROTEIN', value: '18.2 g' },
  { name: 'CALORIES', value: '165 kcal' },
  { name: 'CARBOHYDRATES', value: '3.1 g' },
  { name: 'FAT', value: '7.8 g' },
  { name: 'CHOLESTEROL', value: '88 mg' },
];

export default function TikkaMarinadesDetailScreen({ navigation }: any) {
  const [selectedSize, setSelectedSize] = useState(0);
  const activeOption = SIZE_OPTIONS[selectedSize];

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

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        {/* BREADCRUMBS */}
        <View style={styles.breadcrumbRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.breadText}>Home </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.breadText}> ›  Marinades  ›  </Text>
          </TouchableOpacity>
          <Text style={styles.breadActive}>Tikka Marinades</Text>
        </View>

        {/* MAIN PRODUCT IMAGE */}
        <Image source={require('../assets/image/TikkaMarinades.jpeg')} style={styles.mainProductImage} />

        {/* BLACK INFO CARD */}
        <View style={styles.infoCard}>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>Tikka Marinades</Text>
          </View>
          
          <View style={styles.descBox}>
            <Text style={styles.descText} numberOfLines={3}>
              Our signature Tikka Marinade features tender boneless meat expertly coated in rich, traditional tandoori spices and thick strained yogurt. Ready to grill, bake, or pan-fry instantly.
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

          {/* ACTION BUTTONS */}
          <View style={styles.actionBtnRow}>
            <TouchableOpacity style={styles.addToCartBtn}>
              <Icon name="cart-outline" size={20} color="#000" style={{ marginRight: 8 }} />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.wishlistBtn}>
              <Icon name="heart-outline" size={22} color="#FFF" />
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
            <Text style={styles.cardHeaderTitle}>Market Marinades</Text>
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
  productTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
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