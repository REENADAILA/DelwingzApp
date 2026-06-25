import { StyleSheet } from 'react-native';

export const detailScreenStyles = StyleSheet.create({
  breadcrumbRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 12,
  },

  mainProductImage: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
    marginTop: 10,
  },

  infoCard: {
    backgroundColor: '#111',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: -20,
  },

  descBox: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
  },

  sizeGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  sizeBox: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    alignItems: 'center',
  },

  sizeBoxActive: {
    backgroundColor: '#B31942',
    borderColor: '#B31942',
  },

  sizeBoxInactive: {
    backgroundColor: '#222',
    borderColor: '#333',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },

  wishlistButton: {
    width: 50,
    backgroundColor: '#222',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },

  sectionCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  sectionCardHighlight: {
    backgroundColor: '#FFF0F2',
    borderColor: '#FFE4E6',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#F7FAFC',
    paddingBottom: 8,
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  burgundyCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFE4E6',
  },

  burgundyHeader: {
    backgroundColor: '#800A26',
    padding: 15,
  },

  burgundyBody: {
    padding: 15,
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  stepBadge: {
    backgroundColor: '#FFF0F2',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#FFE4E6',
  },

  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#F7FAFC',
  },
});