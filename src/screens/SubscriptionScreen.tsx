import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SubscriptionScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* ─── APP HEADER BAR ─── */}
      <View style={styles.appHeader}>
        <Text style={styles.brandLogo}>Delwingz</Text>
        
        <View style={styles.headerRightIcons}>
  {/* Bulk Order Toggle Button */}
  <View style={styles.toggleContainer}>
    <View style={styles.toggleSwitch} />
    <Text style={styles.toggleText}>Bulk Order</Text>
  </View>
  
  {/* Search Button */}
  <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
    <Icon name="search-outline" size={20} color="#333" />
  </TouchableOpacity>

  {/* 🍔 Menu / Hamburger Button (Added Back) */}
  <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Profile')}>
    <Icon name="menu-outline" size={24} color="#333" />
  </TouchableOpacity>
</View>
      </View>

      
      <ScrollView>
       <View style={styles.heroBannerBg}>
    <Text style={styles.heroTitle}>Subscribe to Fresh{"\n"}Meats</Text>
    <Text style={styles.heroSubtitle}>
      Pick your favourites, choose delivery dates, and never run out of fresh protein.
    </Text>
  </View>


<View style={styles.subscriptionCartCard}>
  
  {/* Header portion of the card */}
  <View style={styles.cartCardHeaderRow}>
    <View style={styles.cartHeaderLeftTitleRow}>
      <Icon name="basket-outline" size={20} color="#800A26" />
      <Text style={styles.subscriptionCartTitle}>Subscription Cart</Text>
    </View>
  </View>

  {/* Center Content: Empty State Layout */}
  <View style={styles.emptyCartCenterBlock}>
    <View style={styles.emptyIconCircle}>
      <Icon name="bag-handle-outline" size={32} color="#A0AEC0" />
    </View>
    <Text style={styles.emptyCartHeading}>Your cart is empty.</Text>
    <Text style={styles.emptyCartSubtext}>
      Select items from the left to start configuring your deliveries.
    </Text>
  </View>

</View>

      </ScrollView>
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Categories')}>
          <Icon name="grid-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Categories</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Survey')}>
          <Icon name="document-text-outline" size={20} color="#718096" />
          <Text style={styles.tabLabel}>Survey</Text>
        </TouchableOpacity>
        
        {/* Active Tab (Subscription) */}
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Subscription')}>
          <Icon name="calendar" size={20} color="#B31942" />
          <Text style={styles.activeTabLabel}>Subscription</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Cart')}>
          <View style={styles.cartIconWrapper}>
            <Icon name="cart-outline" size={21} color="#718096" />
            <View style={styles.badgeNotificationBubble}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
          <Text style={styles.tabLabel}>Cart</Text>
        </TouchableOpacity>
      </View>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF5F6' // Light pink base app background
  },
  appHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingTop: 40, 
    paddingBottom: 15, 
    backgroundColor: '#FFF' 
  },
  brandLogo: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#B31942', 
    fontStyle: 'italic' 
  },
  headerRightIcons: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12 
  },
  toggleContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF0F2', 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#FFE4E6' 
  },
  toggleSwitch: { 
    width: 16, 
    height: 16, 
    borderRadius: 8, 
    backgroundColor: '#CBD5E0', 
    marginRight: 6 
  },
  toggleText: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#B31942' 
  },
  iconBtn: { 
    padding: 4 
  },
  scrollPadding: { 
    paddingBottom: 100 
  },

  heroBannerBg: { 
  backgroundColor: '#800A26', // Pure burgundy shade from screenshots
  paddingHorizontal: 24, 
  paddingVertical: 28, 
  borderBottomLeftRadius: 24, // Niche se round corners toggles
  borderBottomRightRadius: 24,
},
heroTitle: { 
  fontSize: 28, 
  fontWeight: '900', 
  color: '#FFF', 
  lineHeight: 34 
},
heroSubtitle: { 
  fontSize: 13, 
  color: '#FFB8C6', // Light pinkish text for subtle layout hierarchy
  marginTop: 8, 
  lineHeight: 18 
},

bottomTabBar: { 
  position: 'absolute', 
  bottom: 0, 
  left: 0, 
  right: 0, 
  height: 65, 
  backgroundColor: '#FFF', 
  flexDirection: 'row', 
  borderTopWidth: 1, 
  borderColor: '#E2E8F0', 
  justifyContent: 'space-around', 
  alignItems: 'center' 
},
tabItem: { 
  alignItems: 'center', 
  justifyContent: 'center' 
},
tabLabel: { 
  fontSize: 11, 
  color: '#718096', 
  marginTop: 4, 
  fontWeight: '600' 
},
activeTabLabel: { 
  fontSize: 11, 
  color: '#B31942', 
  marginTop: 4, 
  fontWeight: '600' 
},
cartIconWrapper: { 
  position: 'relative', 
  padding: 2 
},
badgeNotificationBubble: { 
  position: 'absolute', 
  top: -5, 
  right: -8, 
  backgroundColor: '#E53E3E', 
  borderRadius: 9, 
  minWidth: 16, 
  height: 16, 
  justifyContent: 'center', 
  alignItems: 'center', 
  paddingHorizontal: 3 
},
badgeText: { 
  color: '#FFF', 
  fontSize: 9, 
  fontWeight: 'bold', 
  textAlign: 'center' 
},

subscriptionCartCard: { 
  backgroundColor: '#FFF', 
  marginHorizontal: 16, 
  marginTop: -15, // Isse card upar burgundy banner par halka sa overlap karegā jaisa screenshot me hai
  borderRadius: 16, 
  padding: 16, 
  elevation: 4, // Android shadow
  shadowColor: '#000', // iOS shadow
  shadowOffset: { width: 0, height: 2 }, 
  shadowOpacity: 0.1, 
  shadowRadius: 4 
},
cartCardHeaderRow: { 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  borderBottomWidth: 1, 
  borderColor: '#EDF2F7', 
  paddingBottom: 12 
},
cartHeaderLeftTitleRow: { 
  flexDirection: 'row', 
  alignItems: 'center', 
  gap: 6 
},
subscriptionCartTitle: { 
  fontSize: 16, 
  fontWeight: '800', 
  color: '#2D0A13' 
},
emptyCartCenterBlock: { 
  alignItems: 'center', 
  paddingVertical: 24 
},
emptyIconCircle: { 
  width: 56, 
  height: 56, 
  borderRadius: 28, 
  borderStyle: 'dashed', 
  borderWidth: 1, 
  borderColor: '#CBD5E0', 
  justifyContent: 'center', 
  alignItems: 'center', 
  marginBottom: 12 
},
emptyCartHeading: { 
  fontSize: 14, 
  fontWeight: '700', 
  color: '#4A5568', 
  marginBottom: 4 
},
emptyCartSubtext: { 
  fontSize: 12, 
  color: '#718096', 
  textAlign: 'center', 
  paddingHorizontal: 20, 
  lineHeight: 16 
},
});