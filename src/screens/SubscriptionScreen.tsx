import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SubscriptionScreen() {
  return (
    <View style={styles.container}>
      <Icon name="calendar-month-outline" size={48} color="#991B1B" />
      <Text style={styles.mainText}>Subscription Screen</Text>
      <Text style={styles.subText}> Will make plans later.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 15,
  },
  subText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
});