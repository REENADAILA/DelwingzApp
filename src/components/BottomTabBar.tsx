import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MCOnlyIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type BottomTabBarProps = {
  navigation: any;
  activeTab: 'Home' | 'Categories' | 'Survey' | 'Subscription' | 'Cart';
};

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ navigation, activeTab }) => {
  const BOTTOM_TABS = [
    { name: 'Home', icon: 'alpha-d-circle-outline' },
    { name: 'Categories', icon: 'grid' },
    { name: 'Survey', icon: 'clipboard-text-outline' },
    { name: 'Subscription', icon: 'calendar-month-outline' },
    { name: 'Cart', icon: 'cart-outline' },
  ];

  return (
    <View style={styles.bottomBar}>
      {BOTTOM_TABS.map((tab, idx) => {
        const isSelected = tab.name === activeTab;
        return (
          <TouchableOpacity 
            key={idx} 
            style={styles.tab} 
            onPress={() => navigation.navigate(tab.name)}
          >
            <MCOnlyIcon name={tab.icon} size={24} color={isSelected ? '#B71C1C' : '#757575'} />
            <Text style={{ color: isSelected ? '#B71C1C' : '#757575', fontSize: 11, marginTop: 2 }}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    elevation: 8,
  },
  tab: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});