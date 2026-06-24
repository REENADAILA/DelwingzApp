import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      
      <Icon name="cart-outline" size={48} color="#991B1B" />
      <Text style={styles.mainText}>Cart Screen Placeholder</Text>
      <Text style={styles.subText}>Will make it later.</Text>

      {/* Basic mock navigation action button */}
      <TouchableOpacity activeOpacity={0.7} style={styles.button}>
        <Text style={styles.buttonText}>Go Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#991B1B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});