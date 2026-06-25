import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TopNavBar } from '../components/TopNavBar';
import { BottomTabBar } from '../components/BottomTabBar';
import { styles } from '../styles/SubscriptionScreenStyle';

type Props = {
  navigation: any;
};

const SubscriptionScreen: React.FC<Props> = ({ navigation }) => {
  const [isBulkOrder, setIsBulkOrder] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A60024" />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <TopNavBar 
          title={`Subscribe to Fresh\nMeats`}
          subTitle="Pick your favourites, choose delivery dates, and never run out of fresh protein."
          isBulkOrder={isBulkOrder}
          onToggleBulkOrder={() => setIsBulkOrder(!isBulkOrder)}
          onSearchPress={() => console.log('Search Clicked')}
          onMenuPress={() => navigation.navigate('Profile')}
        />

        <View style={styles.bodyContainer}>

          <View style={styles.cartCard}>
            <View style={styles.cardHeader}>
              <FeatherIcon name="shopping-bag" size={20} color="#80001D" />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginLeft: 10 }}>
                Subscription Cart
              </Text>
            </View>
            
            <View style={styles.divider} />

            <View style={styles.emptyStateContainer}>
              <View style={styles.emptyIconWrapper}>
                <FeatherIcon name="shopping-bag" size={45} color="#B0B7C3" />
              </View>
              <Text style={styles.emptyStateTitle}>Your cart is empty.</Text>
              <Text style={styles.emptyStateSubText}>
                Select items from the left to start configuring your deliveries.
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeaderContainer}>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionHeaderText}>CHOOSE PRODUCTS</Text>
            <View style={styles.sectionLine} />
          </View>

        </View>
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Subscription" />
    </View>
  );
};

export default SubscriptionScreen;