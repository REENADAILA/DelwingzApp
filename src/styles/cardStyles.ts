import { StyleSheet } from 'react-native';

export const cardStyles = StyleSheet.create({
  whiteCard: {
    backgroundColor: '#FFF',
  },

  borderedCard: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  roundedCard: {
    borderRadius: 16,
  },

  roundedLargeCard: {
    borderRadius: 20,
  },

  overflowHidden: {
    overflow: 'hidden',
  },

  cardPadding16: {
    padding: 16,
  },

  cardPadding20: {
    padding: 20,
  },

  shadowCard: {
    elevation: 5,
    shadowColor: '#80001D',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },

  lightBorder: {
    borderWidth: 1,
    borderColor: '#FFE4E6',
  },

  darkCard: {
    backgroundColor: '#111',
  },

  secondaryDarkCard: {
    backgroundColor: '#222',
  },
});