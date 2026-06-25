import { StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
  // Containers
  flexContainer: {
    flex: 1,
  },

  whiteContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  lightPinkContainer: {
    flex: 1,
    backgroundColor: '#FFF5F6',
  },

  // Common Rows
  row: {
    flexDirection: 'row',
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowWrapBetween: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Alignment
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  alignCenter: {
    alignItems: 'center',
  },

  justifyCenter: {
    justifyContent: 'center',
  },

  // Position
  absoluteFillHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
  },

  // Common Padding
  horizontal16: {
    paddingHorizontal: 16,
  },

  horizontal20: {
    paddingHorizontal: 20,
  },

  padding15: {
    padding: 15,
  },

  padding16: {
    padding: 16,
  },

  padding20: {
    padding: 20,
  },
});