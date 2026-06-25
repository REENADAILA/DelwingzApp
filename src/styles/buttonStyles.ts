import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#B31942',
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryButton: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  roundedButton: {
    borderRadius: 25,
  },

  mediumRadiusButton: {
    borderRadius: 12,
  },

  smallRadiusButton: {
    borderRadius: 6,
  },

  primaryOutlineButton: {
    borderWidth: 1,
    borderColor: '#B31942',
    backgroundColor: '#FFF',
  },

  whiteOutlineButton: {
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: 'transparent',
  },

  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  secondaryButtonText: {
    color: '#B31942',
    fontWeight: 'bold',
  },

  darkButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },

  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  circularButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
  },
});