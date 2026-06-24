import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SurveyScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
   
      <View style={styles.appHeader}>
        <Text style={styles.brandLogo}>Delwingz</Text>
        <View style={styles.headerRightIcons}>
          <View style={styles.toggleContainer}><Text style={styles.toggleText}>Bulk Order</Text></View>
          <Icon name="magnify" size={22} color="#333" />
          <Icon name="menu" size={26} color="#333" />
        </View>
      </View>

      <ScrollView>

        <View style={styles.feedbackHero}>
          {/* Red Gift Icon */}
          <View style={styles.giftIconCircle}>
            <Icon name="gift" size={32} color="#FFF" />
          </View>

          <Text style={styles.heroMainTitle}>Share Your</Text>
          <Text style={styles.heroSubTitle}>Feedback</Text>

          
          <Text style={styles.heroDesc}>
            Help us serve you better by participating in our surveys.
             Your insights drive our product development and service improvements.
          </Text>

          <View style={styles.badgesRow}>
            <View style={styles.smallBadge}>
              <Icon name="trending-up" size={16} color="#B31942" style={{ marginRight: 6 }} />
              <Text style={styles.badgeText}>Improve our{"\n"}services</Text>
            </View>
            <View style={styles.smallBadge}>
              <Icon name="gift-outline" size={16} color="#B31942" style={{ marginRight: 6 }} />
              <Text style={styles.badgeText}>Better product{"\n"}recommendations</Text>
            </View>
          </View>
        </View>


        {/* 🟢 B2B SURVEY CARD */}
        <View style={styles.surveyCardBlue}>
          {/* Card Header Info */}
          <View style={styles.cardHeaderInfo}>
            <View style={styles.blueIconBox}>
              <Icon name="office-building" size={28} color="#2563EB" />
            </View>
            <View style={styles.timeBadgeRow}>
              <Icon name="clock-outline" size={16} color="#4B5563" style={{ marginRight: 4 }} />
              <Text style={styles.timeText}>5-7 minutes</Text>
            </View>
          </View>

          <Text style={styles.cardMainTitle}>B2B Survey</Text>
          <Text style={styles.cardSubTitle}>15-20 questions</Text>
          
          <View style={styles.divider} />

          <Text style={styles.cardParagraph}>
            For hotels, restaurants & food businesses. Help us understand your procurement needs and business requirements.
          </Text>

          <Text style={styles.sectionHeading}>Target Audience:</Text>
          <Text style={styles.audienceText}>Restaurant owners, Hotel managers, Food business operators</Text>

          <Text style={styles.sectionHeading}>Benefits:</Text>
          <View style={styles.benefitItem}><Text style={styles.arrowIcon}>→</Text><Text style={styles.benefitText}>Customized product recommendations</Text></View>
          <View style={styles.benefitItem}><Text style={styles.arrowIcon}>→</Text><Text style={styles.benefitText}>Better pricing insights</Text></View>
          <View style={styles.benefitItem}><Text style={styles.arrowIcon}>→</Text><Text style={styles.benefitText}>Priority customer support</Text></View>

          <TouchableOpacity style={styles.blueStartBtn} 
             onPress={() => navigation.navigate('B2BSurvey')}>
            <Icon name="file-document-edit-outline" size={18} color="#FFF" style={{ marginRight: 6 }} />
            <Text style={styles.btnText}>Start Survey</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.surveyCardGreen}>

          <View style={styles.cardHeaderInfo}>
            <View style={styles.greenIconBox}>
              <Icon name="dumbbell" size={26} color="#10B981" />
            </View>
            <View style={styles.timeBadgeRow}>
              <Icon name="clock-outline" size={16} color="#4B5563" style={{ marginRight: 4 }} />
              <Text style={styles.timeText}>3-4 minutes</Text>
            </View>
          </View>

          <Text style={styles.cardMainTitle}>Gym Survey</Text>
          <Text style={styles.cardSubTitle}>12 questions</Text>
          
          <View style={styles.divider} />

          <Text style={styles.cardParagraph}>
            For fitness enthusiasts & gym goers. Help us create products tailored for your fitness journey.
          </Text>

          <Text style={styles.sectionHeading}>Target Audience:</Text>
          <Text style={styles.audienceText}>Gym members, Fitness enthusiasts, Personal trainers</Text>

          <Text style={styles.sectionHeading}>Benefits:</Text>
          <View style={styles.benefitItem}><Text style={styles.arrowIcon}>→</Text><Text style={styles.benefitText}>Nutrition-focused products</Text></View>
          <View style={styles.benefitItem}><Text style={styles.arrowIcon}>→</Text><Text style={styles.benefitText}>Protein-rich options</Text></View>
          <View style={styles.benefitItem}><Text style={styles.arrowIcon}>→</Text><Text style={styles.benefitText}>Fitness meal plans</Text></View>

          <TouchableOpacity style={styles.greenStartBtn}
          onPress={() => navigation.navigate('GymSurvey')}>
            <Icon name="file-document-edit-outline" size={18} color="#FFF" style={{ marginRight: 6 }} />
            <Text style={styles.btnText}>Start Survey</Text>
          </TouchableOpacity>

        </View>


        <View style={styles.voiceMattersCard}>
          <Text style={styles.voiceTitle}>Your Voice Matters</Text>
          <Text style={styles.voiceDesc}>
            Every response helps us understand your needs better and create products that truly serve you.
             All surveys are confidential and your data is protected.
          </Text>

          {/* Red Dot Assurance Bullet Points */}
          <View style={styles.confidentialWhiteBox}>
            <View style={styles.dotRow}>
              <View style={styles.redDot} />
              <Text style={styles.dotText}>100% Confidential</Text>
            </View>
          </View>

          <View style={styles.confidentialWhiteBox}>
            <View style={styles.dotRow}>
              <View style={styles.redDot} />
              <Text style={styles.dotText}>Quick & Easy</Text>
            </View>
          </View>

          <View style={styles.confidentialWhiteBox}>
            <View style={styles.dotRow}>
              <View style={styles.redDot} />
              <Text style={styles.dotText}>Direct Impact</Text>
            </View>
          </View>
        </View>
     
      </ScrollView>

      <View style={styles.bottomTabBar}>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={22} color="#718096" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Categories')}>
          <Icon name="grid" size={22} color="#718096" />
          <Text style={styles.tabLabel}>Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}onPress={() => navigation.navigate('Survey')}>
          <Icon name="clipboard-text" size={22} color="#B31942" />
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
  scrollPadding: { paddingBottom: 100 },
  appHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#EEE' },
  brandLogo: { fontSize: 22, fontWeight: 'bold', color: '#B31942', fontStyle: 'italic' },
  headerRightIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleContainer: { backgroundColor: '#FFF0F2', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FFE4E6' },
  toggleText: { fontSize: 12, fontWeight: '700', color: '#B31942' },


  feedbackHero: { alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 },
  giftIconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#B31942', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  heroMainTitle: { fontSize: 32, fontWeight: '800', color: '#111827', textAlign: 'center' },
  heroSubTitle: { fontSize: 32, fontWeight: '800', color: '#B31942', textAlign: 'center', marginTop: -5 },
  heroDesc: { fontSize: 14, color: '#4B5563', textAlign: 'center', lineHeight: 22, marginTop: 15, paddingHorizontal: 10 },
  badgesRow: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginTop: 25, width: '100%' },
  smallBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#FFE4E6', flex: 1, maxWidth: 170 },
  badgeText: { fontSize: 11, color: '#4B5563', fontWeight: '500', lineHeight: 14 },

  bottomTabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#FFF', flexDirection: 'row', borderTopWidth: 1, borderColor: '#E2E8F0', justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabLabel: { fontSize: 11, color: '#718096', marginTop: 4, fontWeight: '600' },
  activeTabLabel: { fontSize: 11, color: '#B31942', marginTop: 4, fontWeight: '700' },

  voiceMattersCard: { backgroundColor: '#FFF', marginHorizontal: 16, borderRadius: 16, padding: 20, marginTop: 25, marginBottom: 40, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  voiceTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', textAlign: 'center' },
  voiceDesc: { fontSize: 14, color: '#4B5563', textAlign: 'center', lineHeight: 22, marginTop: 12, marginBottom: 20 },
  confidentialWhiteBox: { backgroundColor: '#FFF', width: '100%', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12, justifyContent: 'center' },
  dotRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  redDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#B31942', marginRight: 10 },
  dotText: { fontSize: 14, fontWeight: '600', color: '#334155' },

  surveyCardBlue: { backgroundColor: '#FFF', marginHorizontal: 16, borderRadius: 16, borderColor: '#BFDBFE', padding: 16, marginTop: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  cardHeaderInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  blueIconBox: { backgroundColor: '#EFF6FF', padding: 10, borderRadius: 12 },
  timeBadgeRow: { flexDirection: 'row', alignItems: 'center' },
  timeText: { fontSize: 13, color: '#4B5563', fontWeight: '500' },
  cardMainTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A' },
  cardSubTitle: { fontSize: 14, color: '#4B5563', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 },
  cardParagraph: { fontSize: 14, color: '#4B5563', lineHeight: 22, marginBottom: 15 },
  sectionHeading: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginTop: 10, marginBottom: 4 },
  audienceText: { fontSize: 13, color: '#4B5563', lineHeight: 18, marginBottom: 10 },
  benefitItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6, paddingLeft: 4 },
  arrowIcon: { color: '#B31942', fontSize: 14, marginRight: 8, fontWeight: 'bold' },
  benefitText: { fontSize: 13, color: '#4B5563', flex: 1 },
  blueStartBtn: { backgroundColor: '#2563EB', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 10, marginTop: 20 },
  btnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },

  surveyCardGreen: { backgroundColor: '#FFF', marginHorizontal: 16, borderRadius: 16,  borderColor: '#A7F3D0', padding: 16, marginTop: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  greenIconBox: { backgroundColor: '#ECFDF5', padding: 10, borderRadius: 12 },
  greenStartBtn: { backgroundColor: '#10B981', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 10, marginTop: 20 },
});