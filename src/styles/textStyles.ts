import { StyleSheet } from 'react-native';

export const textStyles = StyleSheet.create({
  whiteText: {
    color: '#FFF',
  },

  whiteBold: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  
  brandLogo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B31942',
    fontStyle: 'italic',
  },

  // ---------- Section ----------
  sectionLabel: {
    color: '#718096',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#800A26',
  },

  // ---------- Breadcrumb ----------
  breadcrumbText: {
    color: '#718096',
    fontSize: 12,
  },

  breadcrumbActive: {
    color: '#B31942',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // ---------- Card Titles ----------
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
  },

  // ---------- Product ----------
  productTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A202C',
  },

  productWeight: {
    fontSize: 12,
    color: '#718096',
  },

  // ---------- Prices ----------
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
  },

  oldPrice: {
    fontSize: 11,
    color: '#A0AEC0',
    textDecorationLine: 'line-through',
  },

  // ---------- Discount ----------
  discountText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // ---------- Badge ----------
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // ---------- Quantity ----------
  quantityText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#B31942',
    textAlign: 'center',
  },

  // ---------- Buttons ----------
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  secondaryButtonText: {
    color: '#B31942',
    fontWeight: 'bold',
  },

  // ---------- Description ----------
  descriptionText: {
    color: '#4A5568',
    fontSize: 13,
  },

  mutedText: {
    color: '#718096',
    fontSize: 12,
  },
});