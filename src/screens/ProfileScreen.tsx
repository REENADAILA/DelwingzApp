import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// Back to standard Ionicons format as requested
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      
      {/* 1. TOP RED PROFILE PANEL */}
      <View style={styles.headerBlock}>
        <View style={styles.topActionRow}>
          <View style={styles.profileIconCircle}>
            <Icon name="person-outline" size={26} color="#FFF" />
          </View>
          {/* Close / Back button jo pichli screen par le jayega */}
          <TouchableOpacity style={styles.closeCircleBtn} onPress={() => navigation.navigate('Home')}>
            <Icon name="close" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.welcomeText}>Welcome Guest</Text>
        <Text style={styles.subInfoText}>
          Log in to track orders, manage active subscriptions & enjoy a customized experience.
        </Text>

        {/* Login Button Card */}
        <TouchableOpacity style={styles.loginBtn} >
          <Text style={styles.loginBtnText}>Login / Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* 2. NAVIGATION ITEMS LIST */}
      <ScrollView contentContainerStyle={styles.listPadding}>
        
        {/* SECTION A: SHOP & EXPLORE */}
        <Text style={styles.sectionHeader}>SHOP & EXPLORE</Text>
        
        <TouchableOpacity style={styles.menuRowItem} onPress={() => console.log('Wishlist Clicked')}>
          <View style={styles.rowLeftGroup}>
            <Icon name="heart-outline" size={20} color="#718096" style={styles.rowIcon} />
            <Text style={styles.rowLabelText}>My Wishlist</Text>
          </View>
          <Icon name="chevron-forward" size={16} color="#CBD5E0" />
        </TouchableOpacity>

        {/* SECTION B: SUPPORT & INFO */}
        <Text style={styles.sectionHeader}>SUPPORT & INFO</Text>

        <TouchableOpacity style={styles.menuRowItem} onPress={() => console.log('Contact Us Clicked')}>
          <View style={styles.rowLeftGroup}>
            <Icon name="call-outline" size={20} color="#718096" style={styles.rowIcon} />
            <Text style={styles.rowLabelText}>Contact Us</Text>
          </View>
          <Icon name="chevron-forward" size={16} color="#CBD5E0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRowItem} onPress={() => console.log('Help & Support Clicked')}>
          <View style={styles.rowLeftGroup}>
            <Icon name="chatbox-ellipses-outline" size={20} color="#718096" style={styles.rowIcon} />
            <Text style={styles.rowLabelText}>Help & Support</Text>
          </View>
          <Icon name="chevron-forward" size={16} color="#CBD5E0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRowItem} onPress={() => console.log('FAQs Clicked')}>
          <View style={styles.rowLeftGroup}>
            <Icon name="help-circle-outline" size={20} color="#718096" style={styles.rowIcon} />
            <Text style={styles.rowLabelText}>FAQs</Text>
          </View>
          <Icon name="chevron-forward" size={16} color="#CBD5E0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRowItem} onPress={() => navigation.navigate('AboutDelwingzApp')}>
          <View style={styles.rowLeftGroup}>
            <Icon name="business-outline" size={20} color="#718096" style={styles.rowIcon} />
            <Text style={styles.rowLabelText}>About Delwingz</Text>
          </View>
          <Icon name="chevron-forward" size={16} color="#CBD5E0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRowItem} onPress={() => console.log('Blogs Clicked')}>
          <View style={styles.rowLeftGroup}>
            <Icon name="book-outline" size={20} color="#718096" style={styles.rowIcon} />
            <Text style={styles.rowLabelText}>Blogs & Recipes</Text>
          </View>
          <Icon name="chevron-forward" size={16} color="#CBD5E0" />
        </TouchableOpacity>

      </ScrollView>

      {/* 3. FOOTER COPYRIGHT TAG */}
      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>© 2026 Delwingz. All rights reserved.</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  headerBlock: { backgroundColor: '#A01B3E', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 25, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  topActionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  profileIconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  closeCircleBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  subInfoText: { fontSize: 12, color: '#FFB8C6', lineHeight: 18, marginBottom: 20 },
  loginBtn: { backgroundColor: '#FFF', paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  loginBtnText: { color: '#A01B3E', fontWeight: 'bold', fontSize: 14 },

  listPadding: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 80 },
  sectionHeader: { fontSize: 11, fontWeight: 'bold', color: '#A0AEC0', letterSpacing: 0.8, marginBottom: 15, marginTop: 15 },
  menuRowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderColor: '#F7FAFC' },
  rowLeftGroup: { flexDirection: 'row', alignItems: 'center' },
  rowIcon: { marginRight: 15 },
  rowLabelText: { fontSize: 15, fontWeight: '600', color: '#2D3748' },

  drawerFooter: { position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center' },
  footerText: { fontSize: 11, color: '#A0AEC0', fontWeight: '500' }
});