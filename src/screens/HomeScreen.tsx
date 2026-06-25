import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { TopNavBar } from '../components/TopNavBar';
import { BottomTabBar } from '../components/BottomTabBar';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/HomeScreenStyle';

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
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        
        <View style={styles.heroSection}>
          <TopNavBar 
            title=""
              isBulkOrder={isBulkOrder}
              onToggleBulkOrder={() => setIsBulkOrder(!isBulkOrder)}
              onSearchPress={() => console.log('Search Clicked')}
              onMenuPress={openProfile}
          />

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

      <BottomTabBar navigation={navigation} activeTab="Home" />
    </View>
  );
}
