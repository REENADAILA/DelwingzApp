import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CATEGORIES = [
  { id: '1', name: 'RAW CHICKEN', image: require('../assets/image/RawChicken.jpeg'), screenName: 'RawChicken' },
  { id: '2', name: 'TIKKA MARINADES', image: require('../assets/image/TikkaMarinades.jpeg'), screenName: 'TikkaMarinades' },
  { id: '3', name: 'GRAVY MARINADES', image: require('../assets/image/GravyMarinades.jpeg'), screenName: 'GravyMarinades' },
];

export default function CategoriesScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      
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
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="menu-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        
        <View style={styles.redBanner}>
          <Text style={styles.bannerTitleText}>Shop By</Text>
          <Text style={styles.bannerSubTitleText}>Categories</Text>
        </View>

        <Text style={styles.breadcrumbText}>
          Home  &gt;  <Text style={styles.breadcrumbActive}>Categories</Text>
        </Text>

        <View style={styles.gridContainer}>
          {CATEGORIES.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.categoryCard}
              onPress={() => navigation.navigate(item.screenName)}
            >
              <Image source={item.image} style={styles.categoryImg} resizeMode="contain" />
              <Text style={styles.categoryNameText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem}onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}onPress={() => navigation.navigate('Categories')}>
          <Icon name="grid" size={20} color="#B31942" />
          <Text style={styles.activeTabLabel}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}onPress={() => navigation.navigate('Survey')}>
          <Icon name="document-text-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Survey</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}onPress={() => navigation.navigate('Subscription')}>
          <Icon name="calendar-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}onPress={() => navigation.navigate('Cart')}>
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
  redBanner: { backgroundColor: '#B31942', paddingVertical: 40, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  bannerTitleText: { fontSize: 32, fontWeight: 'bold', color: '#FFF', textAlign: 'center' },
  bannerSubTitleText: { fontSize: 36, fontWeight: '900', color: '#FFF', textAlign: 'center', marginTop: 2 },
  
  breadcrumbText: { fontSize: 14, color: '#A0AEC0', paddingHorizontal: 20, marginTop: 20, marginBottom: 15 },
  breadcrumbActive: { color: '#B31942', fontWeight: 'bold' },
  
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, justifyContent: 'space-between' },
  categoryCard: { width: '47%', paddingVertical: 25, paddingHorizontal: 10, alignItems: 'center', marginBottom: 20, marginHorizontal: '1.5%' },
  categoryImg: { width: 120, height: 100, marginBottom: 15 },
  categoryNameText: { fontSize: 14, fontWeight: '800', color: '#1A202C', textAlign: 'center', letterSpacing: 0.3 },
  
  bottomTabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#FFF', flexDirection: 'row', borderTopWidth: 1, borderColor: '#E2E8F0', justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  tabLabel: { fontSize: 11, color: '#718096', marginTop: 4, fontWeight: '600' },
  activeTabLabel: { fontSize: 11, color: '#B31942', marginTop: 4, fontWeight: '600' }
});