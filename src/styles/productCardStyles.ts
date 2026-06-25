import { StyleSheet } from 'react-native';

export const productCardStyles = StyleSheet.create({
  productCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFE4E6',
  },

  productImage: {
    width: '100%',
    height: 110,
    backgroundColor: '#FAFAFA',
  },

  productTopInfo: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },

  productBottomAction: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },

  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#28A745',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    zIndex: 1,
  },

  addButton: {
    borderWidth: 1,
    borderColor: '#B31942',
    backgroundColor: '#FFF',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 65,
    alignItems: 'center',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B31942',
    borderRadius: 6,
    backgroundColor: '#FFF0F2',
    height: 28,
    overflow: 'hidden',
  },

  quantityButton: {
    paddingHorizontal: 8,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  animatedButton: {
    backgroundColor: '#B31942',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    minWidth: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartBadgeWrapper: {
    position: 'relative',
    padding: 2,
  },

  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: '#E53E3E',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
});