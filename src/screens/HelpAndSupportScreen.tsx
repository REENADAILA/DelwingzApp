import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const COMPLAINT_TYPES = [
  { id: 'prod', title: 'Product Issue', sub: 'Problems with product quality, packaging, or description', icon: 'shopping' },
  { id: 'order', title: 'Order Related', sub: 'Issues with order placement, tracking, or delivery', icon: 'alert-circle-outline' },
  { id: 'delv', title: 'Delivery Problem', sub: 'Late delivery, damaged items, or delivery issues', icon: 'truck-delivery-outline' },
  { id: 'pay', title: 'Payment Issue', sub: 'Billing problems, refunds, or payment errors', icon: 'credit-card-outline' },
  { id: 'web', title: 'Website Problem', sub: 'Technical issues with the website or app', icon: 'monitor' },
  { id: 'other', title: 'Other', sub: 'Any other issues not covered above', icon: 'help-circle-outline' },
];

const FAQS_LIST = [
  { q: 'How do I track my order?', a: 'You can track your order in real-time through your order history in the dashboard. We also send SMS updates.' },
  { q: 'What if my delivery is late?', a: 'We guarantee 30-minute delivery. If your order is delayed, you will receive a discount on your next order. Contact support for immediate assistance.' },
  { q: 'Can I cancel my order?', a: 'Orders can be cancelled within 5 minutes of placement. After that, please contact support for assistance.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, UPI, net banking, and cash on delivery for orders above ₹200.' },
  { q: 'How do I report a quality issue?', a: 'If you are not satisfied with the quality, please submit a complaint through this section. We will investigate and provide a resolution within 24 hours.' },
];

export default function HelpSupportScreen({ navigation }: any) {
  // Tabs State Selector Switcher
  const [activeTab, setActiveTab] = useState<'complaints' | 'faqs' | 'contact'>('complaints');
  
  // Local Input Control Bindings
  const [selectedType, setSelectedType] = useState<string>('prod');
  const [titleInput, setTitleInput] = useState<string>('');
  const [descInput, setDescInput] = useState<string>('');

  const handleSubmit = () => {
    if (!titleInput.trim() || !descInput.trim()) {
      Alert.alert('Validation Error', 'Please fill out all mandatory fields marked with *');
      return;
    }
    Alert.alert('Success', 'Complaint registered successfully!');
    setTitleInput('');
    setDescInput('');
  };

  return (
    <View style={styles.container}>
      {/* 1. APP HEADER BLOCK */}
      <View style={styles.appHeader}>
        <Text style={styles.brandLogo}>Delwingz</Text>
        <View style={styles.headerRightIcons}>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Bulk Order</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="magnify" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Profile')}>
            <Icon name="menu" size={26} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
        
        {/* 2. RED BACKGROUND HERO HERO GRID */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroTitle}>Help & Support</Text>
        </View>

        {/* SUB HEADER BREADCRUMB TEXT */}
        <View style={styles.breadcrumbRow}>
          <Text style={styles.breadText}>Home  ›  </Text>
          <Text style={styles.breadActive}>Help & Support</Text>
        </View>

        {/* 3. CORE CONTROL TAB SELECTOR COMPONENT */}
        <View style={styles.tabsCardBlock}>
          <Text style={styles.cardMainHeading}>Help & Support</Text>

          {/* TAB ITEM TRIGGER: COMPLAINTS */}
          <TouchableOpacity 
            style={[styles.tabSelectRow, activeTab === 'complaints' && styles.tabSelectRowActive]}
            onPress={() => setActiveTab('complaints')}
          >
            <Icon name="alert-circle-outline" size={24} color={activeTab === 'complaints' ? '#800A26' : '#64748B'} />
            <View style={styles.tabTxtBlock}>
              <Text style={[styles.tabTitle, activeTab === 'complaints' && styles.tabTitleActive]}>Complaints</Text>
              <Text style={styles.tabSub}>Submit and track complaints</Text>
            </View>
          </TouchableOpacity>

          {/* TAB ITEM TRIGGER: FAQS */}
          <TouchableOpacity 
            style={[styles.tabSelectRow, activeTab === 'faqs' && styles.tabSelectRowActive]}
            onPress={() => setActiveTab('faqs')}
          >
            <Icon name="help-circle-outline" size={24} color={activeTab === 'faqs' ? '#800A26' : '#64748B'} />
            <View style={styles.tabTxtBlock}>
              <Text style={[styles.tabTitle, activeTab === 'faqs' && styles.tabTitleActive]}>FAQs</Text>
              <Text style={styles.tabSub}>Find quick answers</Text>
            </View>
          </TouchableOpacity>

          {/* TAB ITEM TRIGGER: CONTACT SUPPORT LINK CHANNEL */}
          <TouchableOpacity 
            style={[styles.tabSelectRow, activeTab === 'contact' && styles.tabSelectRowActive]}
            onPress={() => setActiveTab('contact')}
          >
            <Icon name="phone-outline" size={24} color={activeTab === 'contact' ? '#800A26' : '#64748B'} />
            <View style={styles.tabTxtBlock}>
              <Text style={[styles.tabTitle, activeTab === 'contact' && styles.tabTitleActive]}>Contact Us</Text>
              <Text style={styles.tabSub}>Get in touch with support</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 4. RENDERING ENGINE WORKER LAYER */}
        <View style={styles.contentContainer}>
          
          {/* TAB VIEW DISPLAY CHANNEL A: INTERACTIVE COMPLAINT FORM GRID */}
          {activeTab === 'complaints' && (
            <View style={{ width: '100%' }}>
              <View style={styles.complaintSubLinksRow}>
                <TouchableOpacity style={styles.activeSubLinkBtn}>
                  <Text style={styles.activeSubLinkBtnTxt}>+ Submit Complaint</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inactiveSubLinkBtn}>
                  <Text style={styles.inactiveSubLinkBtnTxt}>💬 Complaint History</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.innerWhiteBlockCard}>
                <View style={styles.formMetaHeader}>
                  <Icon name="message-text-outline" size={22} color="#4A5568" />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={styles.innerBlockTitle}>Submit a Complaint</Text>
                    <Text style={styles.innerBlockSub}>Help us improve by reporting any issues you've encountered</Text>
                  </View>
                </View>

                {/* Categories Iteration Mapping Sequence */}
                <Text style={styles.inputFieldLabel}>Complaint Type *</Text>
                {COMPLAINT_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <TouchableOpacity
                      key={type.id}
                      style={[styles.typeSelectCardRow, isSelected && styles.typeSelectCardRowActive]}
                      onPress={() => setSelectedType(type.id)}
                    >
                      <View style={styles.typeIconWrapper}>
                        <Icon name={type.icon} size={20} color="#4A5568" />
                      </View>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.typeTitleText}>{type.title}</Text>
                        <Text style={styles.typeSubText}>{type.sub}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                {/* Core Text Input Elements */}
                <Text style={styles.inputFieldLabel}>Complaint Title *</Text>
                <View style={styles.textInputBoxContainer}>
                  <TextInput
                    style={styles.singleLineInputField}
                    placeholder="Brief description of your issue"
                    placeholderTextColor="#A0AEC0"
                    maxLength={100}
                    value={titleInput}
                    onChangeText={(text) => setTitleInput(text)}
                  />
                </View>
                <Text style={styles.characterCounterLabel}>{titleInput.length}/100</Text>

                <Text style={styles.inputFieldLabel}>Complaint Description *</Text>
                <View style={[styles.textInputBoxContainer, { minHeight: 90, alignItems: 'flex-start', paddingTop: 8 }]}>
                  <TextInput
                    style={styles.multiLineInputField}
                    placeholder="Please provide detailed information about your complaint..."
                    placeholderTextColor="#A0AEC0"
                    maxLength={500}
                    multiline={true}
                    value={descInput}
                    onChangeText={(text) => setDescInput(text)}
                  />
                </View>
                <Text style={styles.characterCounterLabel}>{descInput.length}/500</Text>

                {/* Mock Image Upload Segment Component */}
                <Text style={styles.inputFieldLabel}>Attach Image (Optional)</Text>
                <TouchableOpacity style={styles.uploadImageDashedBox} activeOpacity={0.7}>
                  <Icon name="image-outline" size={32} color="#A0AEC0" />
                  <Text style={styles.uploadMainTxt}>Click to upload <Text style={{ fontWeight: '400', color: '#718096' }}>or drag and drop</Text></Text>
                  <Text style={styles.uploadSubInfoTxt}>PNG, JPG, GIF up to 5MB</Text>
                </TouchableOpacity>

                {/* Action CTA Buttons Layout configuration pipeline */}
                <TouchableOpacity style={styles.submitActionButtonCta} activeOpacity={0.8} onPress={handleSubmit}>
                  <Icon name="sparkles" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.submitActionButtonCtaTxt}>Submit Complaint</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelActionButtonBtn} activeOpacity={0.7} onPress={() => navigation.goBack()}>
                  <Text style={styles.cancelActionButtonBtnTxt}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* TAB VIEW DISPLAY CHANNEL B: THE STATIC HARDCODED DATA ACCORDION */}
          {activeTab === 'faqs' && (
            <View style={styles.innerWhiteBlockCard}>
              <Text style={[styles.innerBlockTitle, { color: '#800A26', fontSize: 19, marginBottom: 16 }]}>Frequently Asked Questions</Text>
              {FAQS_LIST.map((faq, idx) => (
                <View key={idx} style={[styles.faqItemWrapperBox, idx === FAQS_LIST.length - 1 && { borderBottomWidth: 0 }]}>
                  <Text style={styles.faqQuestionTxt}>{faq.q}</Text>
                  <Text style={styles.faqAnswerTxt}>{faq.a}</Text>
                </View>
              ))}
            </View>
          )}

          {/* TAB VIEW DISPLAY CHANNEL C: CONTACT DIRECT CHANNELS INFORMATION MAP CARD */}
          {activeTab === 'contact' && (
            <View style={styles.innerWhiteBlockCard}>
              <Text style={[styles.innerBlockTitle, { color: '#800A26', fontSize: 19, marginBottom: 20 }]}>Get in Touch</Text>
              
              <View style={styles.contactItemChannelRow}>
                <Icon name="phone-outline" size={24} color="#B31942" />
                <View style={{ marginLeft: 14 }}>
                  <Text style={styles.contactChannelTitle}>Phone Support</Text>
                  <Text style={styles.contactChannelBoldValue}>+91 8690555180</Text>
                  <Text style={styles.contactChannelSubMeta}>Available 8 AM - 10 PM</Text>
                </View>
              </View>

              <View style={[styles.contactItemChannelRow, { marginTop: 16 }]}>
                <Icon name="email-outline" size={24} color="#B31942" />
                <View style={{ marginLeft: 14 }}>
                  <Text style={styles.contactChannelTitle}>Email Support</Text>
                  <Text style={styles.contactChannelBoldValue}>info@delwingz.com</Text>
                  <Text style={styles.contactChannelSubMeta}>Response within 24 hours</Text>
                </View>
              </View>
            </View>
          )}

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F6' },
  scrollPadding: { paddingBottom: 50 },
  
  appHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#FFE4E6' },
  brandLogo: { fontSize: 22, fontWeight: 'bold', color: '#B31942', fontStyle: 'italic' },
  headerRightIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleContainer: { backgroundColor: '#FFF0F2', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FFE4E6' },
  toggleText: { fontSize: 12, fontWeight: '700', color: '#B31942' },
  iconBtn: { padding: 4 },

  heroBanner: { backgroundColor: '#A10E33', paddingVertical: 24, alignItems: 'center', justifyContent: 'center' },
  heroTitle: { color: '#FFF', fontSize: 24, fontWeight: '800' },

  breadcrumbRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 16 },
  breadText: { color: '#718096', fontSize: 13 },
  breadActive: { color: '#A10E33', fontSize: 13, fontWeight: '700' },

  tabsCardBlock: { backgroundColor: '#FFF', marginHorizontal: 16, marginTop: 16, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#FFE4E6' },
  cardMainHeading: { fontSize: 18, fontWeight: '800', color: '#2D0A13', marginBottom: 15, borderBottomWidth: 1, borderColor: '#F1F5F9', paddingBottom: 8 },
  
  tabSelectRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 14, marginBottom: 8, borderWidth: 1, borderColor: 'transparent' },
  tabSelectRowActive: { backgroundColor: '#FFF5F6', borderColor: '#FFE4E6' },
  tabTxtBlock: { marginLeft: 14, flex: 1 },
  tabTitle: { fontSize: 15, fontWeight: '700', color: '#4A5568' },
  tabTitleActive: { color: '#800A26' },
  tabSub: { fontSize: 12, color: '#718096', marginTop: 2 },

  contentContainer: { marginTop: 12, width: '100%' },
  complaintSubLinksRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 10 },
  activeSubLinkBtn: { borderBottomWidth: 2, borderColor: '#B31942', paddingVertical: 6 },
  activeSubLinkBtnTxt: { color: '#B31942', fontWeight: '700', fontSize: 14 },
  inactiveSubLinkBtn: { paddingVertical: 6 },
  inactiveSubLinkBtnTxt: { color: '#4A5568', fontWeight: '600', fontSize: 14 },

  innerWhiteBlockCard: { backgroundColor: '#FFF', marginHorizontal: 16, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#FFE4E6', marginBottom: 20 },
  formMetaHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, marginBottom: 14 },
  innerBlockTitle: { fontSize: 17, fontWeight: '800', color: '#1A202C' },
  innerBlockSub: { fontSize: 12, color: '#718096', marginTop: 2, lineHeight: 16 },

  inputFieldLabel: { fontSize: 13, fontWeight: '700', color: '#2D3748', marginTop: 12, marginBottom: 8 },
  typeSelectCardRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 10, marginBottom: 8 },
  typeSelectCardRowActive: { borderColor: '#B31942', backgroundColor: '#FFF5F6' },
  typeIconWrapper: { backgroundColor: '#F1F5F9', width: 34, height: 34, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  typeTitleText: { fontSize: 14, fontWeight: '700', color: '#1A202C' },
  typeSubText: { fontSize: 12, color: '#718096', marginTop: 2, lineHeight: 16 },

  textInputBoxContainer: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, backgroundColor: '#FFF', minHeight: 46, paddingHorizontal: 12, justifyContent: 'center' },
  singleLineInputField: { fontSize: 14, color: '#1A202C', fontWeight: '500', width: '100%', height: '100%' },
  multiLineInputField: { fontSize: 14, color: '#1A202C', fontWeight: '500', width: '100%', minHeight: 70, textAlignVertical: 'top' },
  characterCounterLabel: { fontSize: 11, color: '#A0AEC0', textAlign: 'right', marginTop: 4, marginRight: 2, fontWeight: '600' },

  uploadImageDashedBox: { borderStyle: 'dashed', borderWidth: 1.5, borderColor: '#CBD5E1', borderRadius: 12, paddingVertical: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', marginBottom: 20 },
  uploadMainTxt: { fontSize: 13, fontWeight: '700', color: '#1A202C', marginTop: 8 },
  uploadSubInfoTxt: { fontSize: 11, color: '#94A3B8', marginTop: 3 },

  submitActionButtonCta: { backgroundColor: '#1E293B', paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 10 },
  submitActionButtonCtaTxt: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  cancelActionButtonBtn: { borderWidth: 1, borderColor: '#E2E8F0', paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cancelActionButtonBtnTxt: { color: '#4A5568', fontSize: 14, fontWeight: '700' },

  faqItemWrapperBox: { borderBottomWidth: 1, borderColor: '#F1F5F9', paddingVertical: 12 },
  faqQuestionTxt: { fontSize: 14, fontWeight: '700', color: '#1A202C', lineHeight: 18 },
  faqAnswerTxt: { fontSize: 13, color: '#4A5568', marginTop: 6, lineHeight: 18 },

  contactItemChannelRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF5F6', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#FFE4E6' },
  contactChannelTitle: { fontSize: 12, color: '#718096', fontWeight: '600' },
  contactChannelBoldValue: { fontSize: 15, fontWeight: '800', color: '#1A202C', marginTop: 2 },
  contactChannelSubMeta: { fontSize: 12, color: '#A0AEC0', marginTop: 2 },
});