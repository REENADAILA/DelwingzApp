import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function AboutScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ScrollView>

        <View style={styles.heroContainer}>

        <View style={styles.badgePill}>
            <View style={styles.redDot} />
            <Text style={styles.badgeText}>Revolutionizing India's Meat {"\n"}Commerce</Text>
          </View>

          <Text style={styles.heroMainTitle}>Meet</Text>
          <Text style={styles.heroBrandTitle}>Delwingz</Text>

          <Text style={styles.heroDescription}>
            Aiming to become India's most trusted premium meat delivery platform, combining cutting-edge technology with uncompromising quality to transform how millions access protein.
          </Text>
          </View>

          <View style={styles.missionDarkCard}>
          
          <Text style={styles.missionTitle}>Our Mission:{"\n"}Democratizing{"\n"}Premium{"\n"}Protein</Text>

          <Text style={styles.missionDesc}>
            We're building India's most trusted meat delivery ecosystem—where transparency meets technology, and quality meets convenience. Our mission is to make premium, ethically-sourced protein accessible to every Indian household while creating sustainable value for farmers, investors, and communities.
          </Text>
        </View>

        <View style={styles.advantageHeaderSection}>
          <Text style={styles.advantageMainTitle}>The Delwingz{"\n"}Advantage</Text>
          <Text style={styles.advantageSubTitle}>
            Four pillars of excellence that set us apart in the competitive landscape
          </Text>
        </View>

        <View style={styles.lavenderCard}>
         
          <View style={styles.diamondIconBox}>
            <Icon name="diamond-stone" size={30} color="#2563EB" />
          </View>
        
          <Text style={styles.pillarTitle}>Premium Quality{"\n"}Standards</Text>
          
          <Text style={styles.pillarDesc}>
            ISO-certified facilities, veterinary-approved sourcing, and temperature-controlled delivery—quality that exceeds international standards.
          </Text>
        </View>

        <View style={styles.orangeCard}>
         
          <View style={styles.chartIconBox}>
            <Icon name="trending-up" size={30} color="#EA580C" />
          </View>
          
          <Text style={styles.pillarTitleOrange}>Rapid Market{"\n"}Expansion</Text>
          
          <Text style={styles.pillarDesc}>
            From Jaipur to 50+ cities planned by 2026—we're scaling the infrastructure that will define India's protein economy.
          </Text>
        </View>


        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFAFA' }, 
  scrollPadding: { paddingBottom: 100, paddingTop: 20 },

  heroContainer: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 90, marginBottom: 30 },
  badgePill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF5F5', paddingHorizontal: 46, paddingVertical: 10, borderRadius: 25, borderWidth: 1, borderColor: '#FFE4E6', marginBottom: 35 },
  redDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E53E3E', marginRight: 10,marginBottom: 16},
  badgeText: { fontSize: 15, fontWeight: '700', color: '#E53E3E', textAlign: 'center' },
  heroMainTitle: { fontSize: 44, fontWeight: '800', color: '#0F172A', textAlign: 'center', letterSpacing: -0.5 },
  heroBrandTitle: { fontSize: 48, fontWeight: '900', color: '#E53E3E', textAlign: 'center', marginTop: -5, letterSpacing: -0.5 },
  heroDescription: { fontSize: 16, color: '#4A5568', textAlign: 'center', lineHeight: 26, marginTop: 25, fontWeight: '500' },

  missionDarkCard: { backgroundColor: '#2D0B12', paddingHorizontal: 24, paddingVertical: 40, marginTop: 10, marginBottom: 25,marginHorizontal: 16,borderRadius: 24, },
  missionTitle: { fontSize: 36, fontWeight: '800', color: '#FFF', lineHeight: 44, letterSpacing: -0.5 },
  missionDesc: { fontSize: 16, color: '#F3F4F6', lineHeight: 26, marginTop: 25, fontWeight: '400', opacity: 0.9 },

  advantageHeaderSection: { alignItems: 'center', paddingHorizontal: 24, marginTop: 15, marginBottom: 20 },
  advantageMainTitle: { fontSize: 36, fontWeight: '800', color: '#0F172A', textAlign: 'center', lineHeight: 42, letterSpacing: -0.5 },
  advantageSubTitle: { fontSize: 15, color: '#4A5568', textAlign: 'center', lineHeight: 24, marginTop: 15, fontWeight: '400', paddingHorizontal: 10 },
  lavenderCard: { backgroundColor: '#F8F5FF', marginHorizontal: 16, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#F3E8FF', marginBottom: 15 },
  diamondIconBox: { backgroundColor: '#EFF6FF', width: 54, height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  pillarTitle: { fontSize: 24, fontWeight: '800', color: '#6B21A8', lineHeight: 30 },
  pillarDesc: { fontSize: 15, color: '#4A5568', lineHeight: 24, marginTop: 15, fontWeight: '400' },

  orangeCard: { backgroundColor: '#FFFBF5', marginHorizontal: 16, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 15 },
  chartIconBox: { backgroundColor: '#FFF7ED', width: 54, height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  pillarTitleOrange: { fontSize: 24, fontWeight: '800', color: '#C2410C', lineHeight: 30 },

});