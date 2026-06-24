import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function B2BSurveyScreen({ navigation }: any) {

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [businessSize, setBusinessSize] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [email, setEmail] = useState('');

  const [primarySource, setPrimarySource] = useState('');
  const [purchaseFrequency, setPurchaseFrequency] = useState('');
  const [monthlyConsumption, setMonthlyConsumption] = useState('');
  const [otherProducts, setOtherProducts] = useState('');
  const [mainSupplier, setMainSupplier] = useState('');

  // Dynamic Items Arrays for Meat and FMCG fields
  const [meatItems, setMeatItems] = useState([
    { id: 1, name: '', type: '', qty: '', price: '', supplier: '' }
  ]);

  const [fmcgItems, setFmcgItems] = useState([
    { id: 1, product: '', brand: '', qty: '' }
  ]);

  // Helper functions to add/remove dynamic fields
  const addMeatItem = () => {
    setMeatItems([...meatItems, { id: Date.now(), name: '', type: '', qty: '', price: '', supplier: '' }]);
  };

  const removeMeatItem = (id: number) => {
    setMeatItems(meatItems.filter(item => item.id !== id));
  };

  const addFmcgItem = () => {
    setFmcgItems([...fmcgItems, { id: Date.now(), product: '', brand: '', qty: '' }]);
  };

  const removeFmcgItem = (id: number) => {
    setFmcgItems(fmcgItems.filter(item => item.id !== id));
  };

  const [remarks, setRemarks] = useState('');

  // Form Validation check for Send OTP button active state
  const isContactInfoValid = name.trim().length > 0 && mobile.trim().length === 10;

  return (
    <View style={styles.container}>

      <View style={styles.appHeader}>
        <Text style={styles.brandLogo}>Delwingz</Text>
        <View style={styles.headerRightIcons}>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleSwitch} />
            <Text style={styles.toggleText}>Bulk Order</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}><Icon name="magnify" size={22} color="#333" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Icon name="menu" size={26} color="#333" /></TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>

        <View style={styles.mainWhiteCard}>

          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>

          <Text style={styles.screenMainTitle}>Delwingz for Business{"\n"}Inquiry</Text>
          <Text style={styles.screenSubTitle}>
            Please provide your valuable insights to help us serve you better.
          </Text>

          {/* 🔴 STEP 1: CONTACT CARD SECTION (Always Active) */}
          <View style={styles.sectionCard}>

            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Step 1: Your Contact Information</Text>
              <View style={styles.requiredBadge}>
                <Text style={styles.requiredText}>Required</Text>
              </View>
            </View>

            <Text style={styles.sectionInfoText}>
              Please verify your mobile number to proceed. We'll use this to contact you about your inquiry.
            </Text>

            <Text style={styles.inputLabel}>Contact Person Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter name"
              value={name}
              editable={!isVerified}
              onChangeText={setName}
            />

            <Text style={styles.inputLabel}>Mobile Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter 10-digit mobile number"
              keyboardType="numeric"
              maxLength={10}
              editable={!isVerified}
              value={mobile}
              onChangeText={setMobile}
            />

            {!isVerified ? (
              <TouchableOpacity 
                style={[styles.otpBtn, isContactInfoValid ? styles.otpBtnActive : styles.otpBtnDisabled]} 
                disabled={!isContactInfoValid}
                onPress={() => setIsVerified(true)}
              >
                <Text style={styles.otpBtnText}>Send OTP</Text>
              </TouchableOpacity>
            ) : (
              /* 🟢 GREEN SUCCESS VERIFICATION BOX */
              <View style={styles.successBox}>
                <Icon name="check-circle-outline" size={20} color="#22543D" style={{ marginRight: 8, marginTop: 2 }} />
                <Text style={styles.successText}>
                  Mobile number verified! You can now fill the inquiry form.
                </Text>
              </View>
            )}

          </View>

          {/* 🔒 REST OF THE CONTENT - BLURRED/GREYED AND LOCKED UNTIL VERIFIED */}
          <View 
            style={!isVerified ? styles.blurredOverlayMask : null}
            pointerEvents={isVerified ? 'auto' : 'none'}
          >

            <View style={styles.businessContainer}>
              <Text style={styles.blockHeading}>2. Business Details</Text>

              <Text style={styles.inputLabel}>Hotel / Business Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. The Grand Palace"
                placeholderTextColor="#A0AEC0"
                value={businessName}
                onChangeText={setBusinessName}
              />

              <Text style={styles.inputLabel}>Full Address</Text>
              <View style={styles.inputIconWrapper}>
                <Icon name="map-marker-outline" size={20} color="#A0AEC0" style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, { paddingLeft: 40, flex: 1 }]}
                  placeholder="Start typing address..."
                  placeholderTextColor="#A0AEC0"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>

              <Text style={styles.inputLabel}>Business Size</Text>
              <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholder}>
                  {businessSize ? businessSize : 'Select a size'}
                </Text>
                <Icon name="chevron-down" size={20} color="#4A5568" />
              </TouchableOpacity>

              <Text style={styles.inputLabel}>Cuisine Type</Text>
              <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholder}>
                  {cuisineType ? cuisineType : 'Select a cuisine'}
                </Text>
                <Icon name="chevron-down" size={20} color="#4A5568" />
              </TouchableOpacity>

              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. business@example.com"
                placeholderTextColor="#A0AEC0"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.procurementCard}>
              <View style={styles.blockHeaderRow}>
                <Icon name="cart-outline" size={24} color="#1E293B" style={{ marginRight: 8 }} />
                <Text style={styles.blockCardHeading}>Procurement & Consumption</Text>
              </View>

              <Text style={styles.inputLabel}>Primary Source of Supply</Text>
              <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholder}>
                  {primarySource ? primarySource : 'Select a source'}
                </Text>
                <Icon name="chevron-down" size={20} color="#718096" />
              </TouchableOpacity>

              <Text style={styles.inputLabel}>Purchase Frequency</Text>
              <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholder}>
                  {purchaseFrequency ? purchaseFrequency : 'Select frequency'}
                </Text>
                <Icon name="chevron-down" size={20} color="#718096" />
              </TouchableOpacity>

              <Text style={styles.inputLabel}>Total Monthly Chicken Consumption (Kgs)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., 150"
                placeholderTextColor="#A0AEC0"
                keyboardType="numeric"
                value={monthlyConsumption}
                onChangeText={setMonthlyConsumption}
              />

              <Text style={styles.inputLabel}>Other Products Used (Fish, Mutton, etc.)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Yes, Mutton and Fish"
                placeholderTextColor="#A0AEC0"
                value={otherProducts}
                onChangeText={setOtherProducts}
              />

              <Text style={styles.inputLabel}>Current Main Supplier Name (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Local Market Vendor"
                placeholderTextColor="#A0AEC0"
                value={mainSupplier}
                onChangeText={setMainSupplier}
              />
            </View>

            <View style={styles.procurementCard}>
              <View style={styles.blockHeaderRow}>
                <Icon name="cube-outline" size={24} color="#1E293B" style={{ marginRight: 8 }} />
                <Text style={styles.blockCardHeading}>Meat Items Details</Text>
              </View>

              {meatItems.map((item, index) => (
                <View key={item.id} style={styles.innerItemCard}>
                  <Text style={styles.innerCardLabel}>Item #{index + 1}</Text>

                  <Text style={styles.inputLabel}>Product Name</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., Chicken Breast"
                    placeholderTextColor="#A0AEC0"
                    value={item.name}
                    onChangeText={(val) => {
                      const updated = [...meatItems];
                      updated[index].name = val;
                      setMeatItems(updated);
                    }}
                  />

                  <Text style={styles.inputLabel}>Usage Type</Text>
                  <TouchableOpacity style={styles.dropdownInput}>
                    <Text style={styles.dropdownPlaceholder}>Select type</Text>
                    <Icon name="chevron-down" size={20} color="#718096" />
                  </TouchableOpacity>

                  <Text style={styles.inputLabel}>Quantity Per Month</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., 50 kg"
                    placeholderTextColor="#A0AEC0"
                    value={item.qty}
                    onChangeText={(val) => {
                      const updated = [...meatItems];
                      updated[index].qty = val;
                      setMeatItems(updated);
                    }}
                  />

                  <Text style={styles.inputLabel}>Avg. Buying Price (₹) (Optional)</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., 250"
                    placeholderTextColor="#A0AEC0"
                    keyboardType="numeric"
                    value={item.price}
                    onChangeText={(val) => {
                      const updated = [...meatItems];
                      updated[index].price = val;
                      setMeatItems(updated);
                    }}
                  />

                  <Text style={styles.inputLabel}>Current Brands/Supplier (Optional)</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., Venkys"
                    placeholderTextColor="#A0AEC0"
                    value={item.supplier}
                    onChangeText={(val) => {
                      const updated = [...meatItems];
                      updated[index].supplier = val;
                      setMeatItems(updated);
                    }}
                  />

                  {meatItems.length > 1 && (
                    <TouchableOpacity style={styles.removeBtnRow} onPress={() => removeMeatItem(item.id)}>
                      <Icon name="delete-outline" size={18} color="#718096" />
                      <Text style={styles.removeBtnText}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <TouchableOpacity style={styles.addMoreRowBtn} onPress={addMeatItem}>
                <Icon name="plus-circle-outline" size={20} color="#B31942" />
                <Text style={styles.addMoreRowTxt}>Add Meat Items Detail</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.procurementCard}>
              <View style={styles.blockHeaderRow}>
                <Icon name="barley" size={24} color="#1E293B" style={{ marginRight: 8 }} />
                <Text style={styles.blockCardHeading}>FMCG Staples Details</Text>
              </View>

              {fmcgItems.map((item, index) => (
                <View key={item.id} style={styles.innerItemCard}>
                  <Text style={styles.innerCardLabel}>Item #{index + 1}</Text>

                  <Text style={styles.inputLabel}>Product</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., Atta"
                    placeholderTextColor="#A0AEC0"
                    value={item.product}
                    onChangeText={(val) => {
                      const updated = [...fmcgItems];
                      updated[index].product = val;
                      setFmcgItems(updated);
                    }}
                  />

                  <Text style={styles.inputLabel}>Brand(s)</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., Aashirvaad"
                    placeholderTextColor="#A0AEC0"
                    value={item.brand}
                    onChangeText={(val) => {
                      const updated = [...fmcgItems];
                      updated[index].brand = val;
                      setFmcgItems(updated);
                    }}
                  />

                  <Text style={styles.inputLabel}>Qty/Month</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., 20 bags"
                    placeholderTextColor="#A0AEC0"
                    value={item.qty}
                    onChangeText={(val) => {
                      const updated = [...fmcgItems];
                      updated[index].qty = val;
                      setFmcgItems(updated);
                    }}
                  />

                  {fmcgItems.length > 1 && (
                    <TouchableOpacity style={styles.removeBtnRow} onPress={() => removeFmcgItem(item.id)}>
                      <Icon name="delete-outline" size={18} color="#718096" />
                      <Text style={styles.removeBtnText}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <TouchableOpacity style={styles.addMoreRowBtn} onPress={addFmcgItem}>
                <Icon name="plus-circle-outline" size={20} color="#B31942" />
                <Text style={styles.addMoreRowTxt}>Add FMCG Staples Detail</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.procurementCard}>
              <View style={styles.blockHeaderRow}>
                <Text style={styles.blockCardHeading}>Additional Data (Optional)</Text>
              </View>
              <TouchableOpacity style={styles.addMoreRowBtn}>
                <Icon name="plus-circle-outline" size={20} color="#B31942" />
                <Text style={styles.addMoreRowTxt}>Add Field</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.remarksContainer}>
              <Text style={styles.remarksHeading}>General Remarks (Optional)</Text>
              <TextInput
                style={styles.textAreaInput}
                placeholder="Any other notes about the business, quality requirements, etc."
                placeholderTextColor="#A0AEC0"
                multiline={true}
                numberOfLines={4}
                value={remarks}
                onChangeText={setRemarks}
              />
            </View>

            <TouchableOpacity style={styles.submitSurveyBtn}onPress={() => navigation.navigate('Survey')}>
              <Text style={styles.submitSurveyBtnTxt}>Submit Survey</Text>
              <Icon name="send" size={18} color="#FFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>

      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={22} color="#718096" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}onPress={() => navigation.navigate('Categories')}>
          <Icon name="grid" size={22} color="#718096" />
          <Text style={styles.tabLabel}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}onPress={() => navigation.navigate('Survey')}>
          <Icon name="file-document" size={22} color="#B31942" />
          <Text style={styles.activeTabLabel}>Survey</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}onPress={() => navigation.navigate('Subscription')}>
          <Icon name="calendar-month-outline" size={22} color="#718096" />
          <Text style={styles.tabLabel}>Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart-outline" size={22} color="#718096" />
          <Text style={styles.tabLabel}>Cart</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F6' },
  scrollPadding: { paddingBottom: 120 },

  appHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#EEE' },
  brandLogo: { fontSize: 22, fontWeight: 'bold', color: '#B31942', fontStyle: 'italic' },
  headerRightIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF0F2', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FFE4E6' },
  toggleSwitch: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#CBD5E0', marginRight: 6 },
  toggleText: { fontSize: 12, fontWeight: '700', color: '#B31942' },
  iconBtn: { padding: 4 },

  mainWhiteCard: { backgroundColor: '#FFF', marginHorizontal: 12, marginTop: 15, borderRadius: 24, paddingVertical: 20, paddingHorizontal: 16, minHeight: '100%', borderWidth: 1, borderColor: '#FFE4E6' },

  backBtn: { marginLeft: 16, marginTop: -20, width: 40, height: 40, justifyContent: 'center' },
  screenMainTitle: { fontSize: 26, fontWeight: '800', color: '#0F172A', textAlign: 'center', marginTop: 5, lineHeight: 34 },
  screenSubTitle: { fontSize: 14, color: '#4A5568', textAlign: 'center', paddingHorizontal: 30, marginTop: 12, lineHeight: 22, fontWeight: '400' },
  bottomTabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#FFF', flexDirection: 'row', borderTopWidth: 1, borderColor: '#E2E8F0', justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabLabel: { fontSize: 11, color: '#718096', marginTop: 4, fontWeight: '600' },
  activeTabLabel: { fontSize: 11, color: '#B31942', marginTop: 4, fontWeight: '700' },

  sectionCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2, marginBottom: 20 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  requiredBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  requiredText: { fontSize: 11, fontWeight: '600', color: '#64748B' },
  sectionInfoText: { fontSize: 13, color: '#475569', lineHeight: 18, marginBottom: 15 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 6, marginTop: 10 },
  textInput: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#1E293B' },
  
  // 🔘 OTP Button Validation Styling
  otpBtn: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 15 },
  otpBtnActive: { backgroundColor: '#B31942' }, 
  otpBtnDisabled: { backgroundColor: '#FFB3BA' },
  otpBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },

  successBox: { flexDirection: 'row', backgroundColor: '#F0FDF4', borderColor: '#DCFCE7', borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 15, alignItems: 'flex-start' },
  successText: { color: '#14532D', fontSize: 13, fontWeight: '600', flex: 1, lineHeight: 18 },

  // 🔒 Blur & Blur Layout Overlay Mask
  blurredOverlayMask: { opacity: 0.35 },

  businessContainer: { marginTop: 10, padding: 4, marginBottom: 20 },
  blockHeading: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 15, marginTop: 5 },
  inputIconWrapper: { flexDirection: 'row', alignItems: 'center', position: 'relative' },
  inputIcon: { position: 'absolute', left: 12, zIndex: 1 },
  dropdownInput: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E0', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginTop: 2 },
  dropdownPlaceholder: { fontSize: 14, color: '#4A5568', fontWeight: '500' },

  procurementCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#FFE4E6', marginBottom: 20, marginTop: 10 },
  blockHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, borderColor: '#F8FAFC', paddingBottom: 10 },
  blockCardHeading: { fontSize: 18, fontWeight: '700', color: '#1E293B' },

  innerItemCard: { borderColor: '#FFE4E6', borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 15, backgroundColor: '#FFF' },
  innerCardLabel: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  removeBtnRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 12, gap: 4 },
  removeBtnText: { fontSize: 13, color: '#718096', fontWeight: '600' },
  addMoreRowBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 6, paddingVertical: 4 },
  addMoreRowTxt: { fontSize: 15, fontWeight: '700', color: '#B31942' },

  remarksContainer: { marginTop: 10, marginBottom: 25 },
  remarksHeading: { fontSize: 15, fontWeight: '600', color: '#4A5568', marginBottom: 8 },
  textAreaInput: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#1E293B', height: 100, textAlignVertical: 'top' },
  submitSurveyBtn: { backgroundColor: '#E53E3E', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: 12, marginTop: 10, shadowColor: '#E53E3E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 4, marginBottom: 50 },
  submitSurveyBtnTxt: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});