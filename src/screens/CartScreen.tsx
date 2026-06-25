import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../context/CartContext'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dbEngine from '../database/DatabaseEngine';

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const { refreshCartFromSQL } = useContext(CartContext) || {};

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showTaxBreakup, setShowTaxBreakup] = useState<boolean>(false);
  const [gstinChecked, setGstinChecked] = useState<boolean>(false);
  const [useWalletChecked, setUseWalletChecked] = useState<boolean>(false);

  // Address entry state
  const [addressInput, setAddressInput] = useState<string>("");

  // Delivery Slots setup
  const slotsList = ["Morning (7AM - 10AM)", "Noon (1PM - 3PM)", "Evening (6PM - 9PM)"];
  const [selectedSlot, setSelectedSlot] = useState<string>("Noon (1PM - 3PM)");
  const [showSlotDropdown, setShowSlotDropdown] = useState<boolean>(false);

  // 🔄 FETCH REAL TIME DYNAMIC PRODUCTS FROM SQLite
  const fetchCartItems = async () => {
    try {
      await dbEngine.initDatabase();
      const result = await dbEngine.execute("SELECT * FROM cart;", []);
      const tempCart = [];

      if (result && result.rows && result.rows.length > 0) {
        for (let i = 0; i < result.rows.length; i++) {
          const row = result.rows.item(i);
          const imageSource = isNaN(Number(row.image)) ? row.image : Number(row.image);

          tempCart.push({
            id: row.id,
            name: row.name,
            price: parseFloat(row.price) || 0,
            size: row.size || '250g',
            qty: Number(row.qty),
            image: imageSource,
            description: row.description || '',
          });
        }
      }
      setCartItems(tempCart);
      if (refreshCartFromSQL) {
        refreshCartFromSQL();
      }
    } catch (error) {
      console.log("Error loading cart rows:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCartItems();
    });
    fetchCartItems();
    return unsubscribe;
  }, [navigation]);

  // ➕➖ DYNAMIC ENGINE COUNTER HANDLERS
  const updateQuantity = async (id: string, type: 'increase' | 'decrease') => {
    try {
      await dbEngine.initDatabase();
      const checkQuery = await dbEngine.execute("SELECT qty FROM cart WHERE id = ?;", [id]);

      if (checkQuery && checkQuery.rows && checkQuery.rows.length > 0) {
        const currentQty = checkQuery.rows.item(0).qty;
        if (type === 'increase') {
          await dbEngine.execute("UPDATE cart SET qty = ? WHERE id = ?;", [currentQty + 1, id]);
        } else {
          if (currentQty > 1) {
            await dbEngine.execute("UPDATE cart SET qty = ? WHERE id = ?;", [currentQty - 1, id]);
          } else {
            await dbEngine.execute("DELETE FROM cart WHERE id = ?;", [id]);
          }
        }
      }
      fetchCartItems();
    } catch (error) {
      console.log("Error modifying quantity logs:", error);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      await dbEngine.initDatabase();
      await dbEngine.execute("DELETE FROM cart WHERE id = ?;", [id]);
      fetchCartItems();
    } catch (error) {
      console.log("Error deleting cart row:", error);
    }
  };

  // 💰 CALCULATE DYNAMIC SUMS & TAX SUMMARY ESTIMATIONS
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const taxableAmount = (totalAmount * 0.9523).toFixed(2);
  const cgstEst = (totalAmount * 0.0238).toFixed(2);
  const sgstEst = (totalAmount * 0.0238).toFixed(2);

  return (
    <View style={styles.container}>

      {/* RENDER EMPTY STATE OR ACTIVE DYNAMIC LIST */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainerCentering}>
          <View style={styles.cartHeaderBarStatic}>
            <View style={styles.headerLeftTitleRow}>
              <View style={styles.cartIconBadge}>
                <Icon name="cart" size={16} color="#FFF" />
              </View>
              <Text style={styles.cartHeaderTitle}>Shopping Cart</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="close" size={22} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View style={styles.emptyWhiteCard}>
            <View style={styles.emptyCartIconWrapper}>
              <Icon name="cart-outline" size={36} color="#B31942" />
            </View>
            <Text style={styles.emptyCardTitle}>Your cart is empty</Text>
            <Text style={styles.emptyCardSub}>Add fresh products to get started.</Text>
            <TouchableOpacity style={styles.shopNowBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.shopNowBtnTxt}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
 <>
 <View style={styles.cartHeaderBarStatic}>
              <View style={styles.headerLeftTitleRow}>
                <View style={styles.cartIconBadge}>
                  <Icon name="cart" size={16} color="#FFF" />
                </View>
                <Text style={styles.cartHeaderTitle}>Shopping Cart</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
            
            {/* HEADER COMPONENT INSIDE SCROLL SHEET */}
            

            <Text style={styles.sectionLabelTitle}>RETAIL ITEMS</Text>

            {/* 🔄 DYNAMIC LOOP CONTEXT COMPONENT FOR PRODUCTS */}
            {cartItems.map((item) => (
              <View key={item.id.toString()} style={styles.productCartCard}>
                <View style={styles.cardMainContentRow}>
                  {item.image ? (
                    <Image 
                      source={typeof item.image === 'number' ? item.image : { uri: item.image }} 
                      style={styles.cartProductImg} 
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={[styles.cartProductImg, { backgroundColor: '#EFEFEF' }]} />
                  )}
                  
                  <View style={styles.productDetailsBlock}>
                    <View style={styles.productTitleRow}>
                      <Text style={styles.productTitleText} numberOfLines={2}>{item.name}</Text>
                      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                        <Icon name="delete-outline" size={20} color="#B31942" />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.currentPriceTxt}>₹{(item.price).toFixed(2)}</Text>
                    <View style={styles.oldPriceInfoRow}>
                      <Text style={styles.oldPriceStriked}>₹{(item.price * 1.15).toFixed(2)}</Text>
                      <Text style={styles.discountBadgeText}>10% OFF</Text>
                    </View>

                    <Text style={styles.bulkPricingAlert}>Add 9.75 kg more to unlock bulk pricing</Text>
                    
                    <View style={styles.variantInlineRow}>
                      {/* Left Column: Variant Selection */}
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={styles.variantLabel}>Variant:</Text>
                        <TouchableOpacity style={styles.variantDropdown}>
                          <Text style={styles.variantValueText}>{item.size}</Text>
                          <Icon name="chevron-down" size={14} color="#4A5568" />
                        </TouchableOpacity>
                      </View>

                      {/* Right Column: Counter Control Box */}
                      <View style={styles.counterActionContainer}>
                        <TouchableOpacity style={styles.counterBtn} onPress={() => updateQuantity(item.id, 'decrease')}>
                          <Icon name="minus" size={14} color="#1E293B" />
                        </TouchableOpacity>
                        <Text style={styles.counterValueText}>{item.qty}</Text>
                        <TouchableOpacity style={styles.counterBtn} onPress={() => updateQuantity(item.id, 'increase')}>
                          <Icon name="plus" size={14} color="#1E293B" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            {/* ADDRESS INPUT FIELD AND ACTIVE SLOT DROPDOWN */}
            <View style={styles.whiteCardBlock}>
              <View style={styles.blockTitleRow}>
                <Icon name="map-marker" size={20} color="#EF4444" style={{ marginRight: 6 }} />
                <Text style={styles.blockHeadingTitle}>Delivery Address</Text>
              </View>
              
              {/* Text Input Area for Entering Address */}
              <View style={styles.addressInputContainer}>
                <TextInput
                  style={styles.addressInputField}
                  placeholder="Enter your delivery address here..."
                  placeholderTextColor="#A0AEC0"
                  value={addressInput}
                  onChangeText={setAddressInput}
                  multiline={true}
                />
              </View>

              <View style={[styles.blockTitleRow, { marginTop: 15 }]}>
                <Icon name="clock-outline" size={20} color="#0EA5E9" style={{ marginRight: 6 }} />
                <Text style={styles.blockHeadingTitle}>Delivery Slot</Text>
              </View>
              
              {/* Slot selector field */}
              <TouchableOpacity 
                style={styles.addressSelectorDropdown}
                onPress={() => setShowSlotDropdown(!showSlotDropdown)}
              >
                <Text style={styles.addressDropdownTxt}>{selectedSlot}</Text>
                <Icon name={showSlotDropdown ? "chevron-up" : "chevron-down"} size={20} color="#4A5568" />
              </TouchableOpacity>

              {/* Collapsible Slots selection list */}
              {showSlotDropdown && (
                <View style={styles.slotsDropdownMenuContainer}>
                  {slotsList.map((slot, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.slotItemRow, 
                        selectedSlot === slot && styles.slotItemActive
                      ]}
                      onPress={() => {
                        setSelectedSlot(slot);
                        setShowSlotDropdown(false);
                      }}
                    >
                      <Text style={[
                        styles.slotItemTxt, 
                        selectedSlot === slot && styles.slotItemActiveTxt
                      ]}>
                        {slot}
                      </Text>
                      {selectedSlot === slot && <Icon name="check" size={16} color="#800A26" />}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* GSTIN INLINE ROW */}
            <View style={styles.gstCheckboxRow}>
              <Text style={styles.gstLabelTxt}>GSTIN</Text>
              <TouchableOpacity 
                style={[styles.checkboxBox, gstinChecked && styles.checkboxChecked]} 
                onPress={() => setGstinChecked(!gstinChecked)}
              >
                {gstinChecked && <Icon name="check" size={12} color="#FFF" />}
              </TouchableOpacity>
            </View>

            {/* USE WALLET BALANCE INLINE ROW */}
            <View style={styles.walletCheckboxRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <TouchableOpacity 
                  style={[styles.checkboxBox, useWalletChecked && styles.checkboxChecked]} 
                  onPress={() => setUseWalletChecked(!useWalletChecked)}
                >
                  {useWalletChecked && <Icon name="check" size={12} color="#FFF" />}
                </TouchableOpacity>
                <Text style={styles.walletLabelTxt}>Use Wallet Balance</Text>
              </View>
              <Text style={styles.walletBalanceBold}>₹50.00</Text>
            </View>

            {/* TAX BREAKDOWN DETAILS CONTAINER */}
            <View style={styles.whiteCardBlock}>
              <View style={styles.taxSummaryHeaderRow}>
                <View>
                  <Text style={styles.totalPriceLabel}>Total</Text>
                  <Text style={styles.totalPriceBoldValue}>₹{totalAmount.toFixed(2)}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.expandTaxToggleBtn}
                  onPress={() => setShowTaxBreakup(!showTaxBreakup)}
                >
                  <Text style={styles.expandToggleBtnTxt}>{showTaxBreakup ? 'Hide' : 'View'}</Text>
                  <Icon name={showTaxBreakup ? 'chevron-up' : 'chevron-down'} size={16} color="#475569" />
                </TouchableOpacity>
              </View>

              {showTaxBreakup && (
                <View style={styles.taxBreakupContentContainer}>
                  <View style={styles.taxRowLine}>
                    <Text style={styles.taxRowLabel}>Taxable Amount ({totalItemsCount} items)</Text>
                    <Text style={styles.taxRowVal}>₹{taxableAmount}</Text>
                  </View>
                  <View style={styles.taxRowLine}>
                    <Text style={styles.taxRowLabel}>CGST (est.)</Text>
                    <Text style={styles.taxRowVal}>₹{cgstEst}</Text>
                  </View>
                  <View style={styles.taxRowLine}>
                    <Text style={styles.taxRowLabel}>SGST (est.)</Text>
                    <Text style={styles.taxRowVal}>₹{sgstEst}</Text>
                  </View>
                  <View style={[styles.taxRowLine, { borderTopWidth: 1, borderColor: '#F1F5F9', paddingTop: 8, marginTop: 4 }]}>
                    <Text style={[styles.taxRowLabel, { color: '#0F172A', fontWeight: '700' }]}>Total</Text>
                    <Text style={[styles.taxRowVal, { color: '#0F172A', fontWeight: '700' }]}>₹{totalAmount.toFixed(2)}</Text>
                  </View>
                  <View style={styles.taxRowLine}>
                    <Text style={styles.taxRowLabel}>Delivery Fee</Text>
                    <Text style={[styles.taxRowVal, { color: '#22C55E', fontWeight: '600' }]}>Free</Text>
                  </View>
                </View>
              )}
            </View>

          </ScrollView>

          {/* OVERLAY STICKY BOTTOM ACTIONS FOOTER */}
          <View style={styles.stickyFooterAmountBar}>
            <View style={styles.footerSummaryTextRow}>
              <Text style={styles.footerAmountLabel}>Total Amount</Text>
              <Text style={styles.footerAmountValueBold}>₹{totalAmount.toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              style={styles.proceedCheckoutBtn}
              onPress={async () => {
                await dbEngine.clearInstantCheckout();
                for (let i = 0; i < cartItems.length; i++) {
                  await dbEngine.addToInstantCheckout(cartItems[i]);
                }
                navigation.navigate('Buy');
              }}
            >
              <Text style={styles.proceedCheckoutBtnTxt}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F6', paddingTop: 20 },
  scrollPadding: { paddingHorizontal: 16, paddingBottom: 130, paddingTop: 10 },

  cartHeaderBarStatic: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15,paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#FFE4E6', backgroundColor: '#FFF5F6', marginBottom: 10, marginTop: 40,paddingTop:0, },
  headerLeftTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cartIconBadge: { backgroundColor: '#800A26', width: 30, height: 30, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  cartHeaderTitle: { fontSize: 19, fontWeight: '800', color: '#800A26' },

  emptyContainerCentering: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  emptyWhiteCard: { backgroundColor: '#FFF', width: '100%', borderRadius: 24, paddingVertical: 40, paddingHorizontal: 20, alignItems: 'center', borderWidth: 1, borderColor: '#FFE4E6', marginTop: 40 },
  emptyCartIconWrapper: { backgroundColor: '#FFF0F2', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  emptyCardTitle: { fontSize: 22, fontWeight: '800', color: '#2D0A13', marginBottom: 8 },
  emptyCardSub: { fontSize: 14, color: '#718096', textAlign: 'center', marginBottom: 25 },
  shopNowBtn: { backgroundColor: '#A10E33', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 20 },
  shopNowBtnTxt: { color: '#FFF', fontWeight: '700', fontSize: 15 },

  sectionLabelTitle: { fontSize: 13, fontWeight: '800', color: '#2D3748', marginTop: 10, marginBottom: 10, letterSpacing: 0.3 },
  productCartCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#FFE4E6', marginBottom: 15 },
  cardMainContentRow: { flexDirection: 'row', gap: 12 },
  cartProductImg: { width: 80, height: 80, borderRadius: 14 },
  productDetailsBlock: { flex: 1 },
  productTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 },
  productTitleText: { fontSize: 15, fontWeight: '700', color: '#1A202C', flex: 1, lineHeight: 18 },
  currentPriceTxt: { fontSize: 15, fontWeight: '800', color: '#1A202C', marginTop: 4 },
  oldPriceInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  oldPriceStriked: { fontSize: 12, color: '#A0AEC0', textDecorationLine: 'line-through' },
  discountBadgeText: { fontSize: 12, fontWeight: '700', color: '#38A169' },
  bulkPricingAlert: { fontSize: 12, fontWeight: '600', color: '#D69E2E', marginTop: 4 },
  
  variantInlineRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, width: '100%' },
  variantLabel: { fontSize: 13, color: '#718096' },
  variantDropdown: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderColor: '#FFE4E6', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, backgroundColor: '#FFF' },
  variantValueText: { fontSize: 13, fontWeight: '600', color: '#2D3748' },

  counterActionContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#EDF2F7', borderRadius: 8, height: 30, paddingLeft: 6 },
  counterBtn: { width: 13, height: 26, justifyContent: 'center', alignItems: 'center' },
  counterValueText: { fontSize: 13, fontWeight: '700', color: '#1A202C', minWidth: 16, textAlign: 'center' },

  whiteCardBlock: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#FFE4E6', marginBottom: 15 },
  blockTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  blockHeadingTitle: { fontSize: 15, fontWeight: '700', color: '#1A202C', marginLeft: 2 },
  
  addressInputContainer: { borderWidth: 1, borderColor: '#FFE4E6', borderRadius: 12, backgroundColor: '#FFF', marginBottom: 5, paddingHorizontal: 12, paddingVertical: 4 },
  addressInputField: { fontSize: 14, color: '#1A202C', fontWeight: '500', minHeight: 45, textAlignVertical: 'top' },
  
  addressSelectorDropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#FFE4E6', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12, backgroundColor: '#FFF', marginBottom: 5 },
  addressDropdownTxt: { fontSize: 14, color: '#1A202C', fontWeight: '500', flex: 1 },

  slotsDropdownMenuContainer: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#FFE4E6', borderRadius: 12, paddingVertical: 4, marginTop: 4 },
  slotItemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 0.5, borderColor: '#EDF2F7' },
  slotItemActive: { backgroundColor: '#FFF5F6' },
  slotItemTxt: { fontSize: 14, color: '#4A5568', fontWeight: '500' },
  slotItemActiveTxt: { color: '#800A26', fontWeight: '700' },

  gstCheckboxRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, marginBottom: 15, marginTop: 5 },
  walletCheckboxRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, marginBottom: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#EDF2F7', paddingVertical: 16 },
  gstLabelTxt: { fontSize: 15, fontWeight: '700', color: '#2D3748' },
  walletLabelTxt: { fontSize: 15, fontWeight: '600', color: '#2D3748' },
  walletBalanceBold: { fontSize: 15, fontWeight: '700', color: '#1A202C' },
  checkboxBox: { width: 18, height: 18, borderWidth: 1.5, borderColor: '#A0AEC0', borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  checkboxChecked: { backgroundColor: '#800A26', borderColor: '#800A26' },

  taxSummaryHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalPriceLabel: { fontSize: 13, color: '#718096', fontWeight: '500' },
  totalPriceBoldValue: { fontSize: 18, fontWeight: '800', color: '#1A202C' },
  expandTaxToggleBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 8, gap: 4 },
  expandToggleBtnTxt: { fontSize: 13, fontWeight: '600', color: '#4A5568' },
  taxBreakupContentContainer: { marginTop: 12, borderTopWidth: 1, borderColor: '#EDF2F7', paddingTop: 10, gap: 8 },
  taxRowLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taxRowLabel: { fontSize: 13, color: '#718096' },
  taxRowVal: { fontSize: 13, color: '#1A202C', fontWeight: '600' },

  stickyFooterAmountBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1, borderColor: '#E2E8F0', paddingBottom: 25 },
  footerSummaryTextRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  footerAmountLabel: { fontSize: 15, color: '#1A202C', fontWeight: '600' },
  footerAmountValueBold: { fontSize: 18, fontWeight: '800', color: '#1A202C' },
  proceedCheckoutBtn: { backgroundColor: '#A10E33', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  proceedCheckoutBtnTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' }
});