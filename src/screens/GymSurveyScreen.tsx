import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function ProteinScoreSurveyScreen({ navigation }: any) {
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  
  // Validation status toggles based on user interaction shown in screenshots
  const [showNameError, setShowNameError] = useState(true);
  const [showEmailError, setShowEmailError] = useState(true);

  // Dynamic input validation evaluation
  const handleNextValidation = () => {
    let hasError = false;
    if (fullName.trim() === '') {
      setShowNameError(true);
      hasError = true;
    } else {
      setShowNameError(false);
    }

    if (emailAddress.trim() === '' || !emailAddress.includes('@')) {
      setShowEmailError(true);
      hasError = true;
    } else {
      setShowEmailError(false);
    }

    if (!hasError) {
      // Logic to transition to Question 2 of 14 goes here
      console.log("Navigating to next step...");
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔴 TOP GLOBAL APP HEADER BAR */}
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

      {/* MAIN SCREEN INNER SCROLL CONTAINER */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        
        {/* HERO HEADER TEXT DESCRIPTION BLOCKS (From image 1000083994.jpg) */}
        <Text style={styles.mainHeadingTitle}>Check Your Protein{"\n"}Score</Text>
        
        <Text style={styles.subHeadingDescription}>
          Answer a few quick questions to discover your protein profile and get personalized recommendations
        </Text>

        <Text style={styles.quickBulletHighlightsText}>
          Quick survey • Earn points • Get better protein
        </Text>

        {/* PROGRESS SYSTEM STATUS TRACKER COMPONENT */}
        <View style={styles.progressDataRow}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressValueCounterText}>1 of 14</Text>
        </View>
        <View style={styles.progressBarTrackEmpty}>
          <View style={[styles.progressBarTrackFilledActive, { width: `${(1 / 14) * 100}%` }]} />
        </View>

        {/* ⚪ THE CENTRAL ROUNDED WHITE QUESTION BLOCK CARD */}
        <View style={styles.questionWhiteCard}>
          
          {/* Question Number Badge Layer */}
          <View style={styles.questionBadgePill}>
            <Text style={styles.questionBadgeTxt}>Question 1</Text>
          </View>

          {/* Core Embedded Question Inline Header block */}
          <View style={styles.questionLayoutTitleRow}>
            <Icon name="account-outline" size={24} color="#C2410C" style={styles.userSectionLeadingIcon} />
            <Text style={styles.questionCoreTitleText}>What's your name &{"\n"}email?</Text>
          </View>

          {/* Full Name Form Field Container */}
          <TextInput
            style={[styles.formInputContainerStyle, showNameError ? styles.formInputDangerBorder : null]}
            placeholder="Enter your full name"
            placeholderTextColor="#94A3B8"
            value={fullName}
            onChangeText={(val) => {
              setFullName(val);
              if(val.trim() !== '') setShowNameError(false);
            }}
          />

          {/* Email Address Form Field Container */}
          <TextInput
            style={[styles.formInputContainerStyle, showEmailError ? styles.formInputDangerBorder : null, { marginTop: 15 }]}
            placeholder="Enter your email address"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={(val) => {
              setEmailAddress(val);
              if(val.trim() !== '' && val.includes('@')) setShowEmailError(false);
            }}
          />

          {/* ⚠️ LIVE INLINE ERROR VALIDATION ALERTS (From image 1000083995.jpg) */}
          {showNameError && (
            <View style={styles.dangerValidationMessageRow}>
              <Icon name="alert-circle-outline" size={16} color="#991B1B" style={{ marginRight: 6 }} />
              <Text style={styles.dangerAlertMessageText}>Please enter your name</Text>
            </View>
          )}

          {showEmailError && (
            <View style={[styles.dangerValidationMessageRow, { marginTop: showNameError ? 6 : 12 }]}>
              <Icon name="alert-circle-outline" size={16} color="#991B1B" style={{ marginRight: 6 }} />
              <Text style={styles.dangerAlertMessageText}>Please enter your email</Text>
            </View>
          )}

        </View>

        {/* DIRECTIONAL NAVIGATION BOTTOM BUTTON CONTROLS */}
        <View style={styles.actionBtnControlRowInline}>
          <TouchableOpacity style={styles.previousPageDisabledBtn} disabled={true}>
            <Icon name="chevron-left" size={20} color="#94A3B8" style={{ marginRight: 4 }} />
            <Text style={styles.previousPageDisabledBtnTxt}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextStepGradientActionBtn} onPress={handleNextValidation}>
            <Text style={styles.nextStepGradientActionBtnTxt}>Next</Text>
            <Icon name="chevron-right" size={20} color="#FFF" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        {/* REWARD TROPHY FOOTER CAPTION COMPONENT STATEMENT */}
        <View style={styles.rewardTrophyMessageContainerRow}>
          <Text style={styles.rewardTrophyIconDesign}>🏆</Text>
          <Text style={styles.rewardCaptionCoreBodyDescriptionText}>
            Complete the survey to unlock your protein score and get personalized recommendations!
          </Text>
        </View>

        <Text style={styles.confidentialDisclaimerInfoText}>
          All responses are confidential and will help us serve you better.
        </Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDFD' },
  scrollPadding: { paddingHorizontal: 16, paddingBottom: 60, paddingTop: 10 },
  
  appHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#EEE' },
  brandLogo: { fontSize: 22, fontWeight: 'bold', color: '#B31942', fontStyle: 'italic' },
  headerRightIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF0F2', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FFE4E6' },
  toggleSwitch: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#CBD5E0', marginRight: 6 },
  toggleText: { fontSize: 12, fontWeight: '700', color: '#B31942' },
  iconBtn: { padding: 4 },

  mainHeadingTitle: { fontSize: 30, fontWeight: '900', color: '#1E293B', textAlign: 'center', marginTop: 25, lineHeight: 38 },
  subHeadingDescription: { fontSize: 15, color: '#4A5568', textAlign: 'center', paddingHorizontal: 12, marginTop: 15, lineHeight: 24, fontWeight: '400' },
  quickBulletHighlightsText: { fontSize: 13.5, color: '#718096', fontWeight: '600', textAlign: 'center', marginTop: 15, marginBottom: 25 },

  progressDataRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, paddingHorizontal: 4 },
  progressLabel: { fontSize: 14, fontWeight: '600', color: '#4A5568' },
  progressValueCounterText: { fontSize: 14, fontWeight: '700', color: '#4A5568' },
  progressBarTrackEmpty: { width: '100%', height: 6, backgroundColor: '#E2E8F0', borderRadius: 10, marginTop: 8, marginBottom: 25, overflow: 'hidden' },
  progressBarTrackFilledActive: { height: '100%', backgroundColor: '#EA580C', borderRadius: 10 },

  questionWhiteCard: { backgroundColor: '#FFF', borderRadius: 24, paddingVertical: 24, paddingHorizontal: 20, borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#94A3B8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 15, elevation: 3, marginBottom: 25 },
  questionBadgePill: { backgroundColor: '#FEE2E2', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 14, alignSelf: 'flex-start', marginBottom: 15 },
  questionBadgeTxt: { fontSize: 13, fontWeight: '700', color: '#991B1B' },
  questionLayoutTitleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 20 },
  userSectionLeadingIcon: { marginTop: 4 },
  questionCoreTitleText: { fontSize: 20, fontWeight: '800', color: '#0F172A', lineHeight: 28 },

  formInputContainerStyle: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E0', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#1E293B', fontWeight: '500' },
  formInputDangerBorder: { borderColor: '#B91C1C', backgroundColor: '#FFF' },
  
  dangerValidationMessageRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, paddingHorizontal: 4 },
  dangerAlertMessageText: { color: '#991B1B', fontSize: 13.5, fontWeight: '600' },

  actionBtnControlRowInline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, marginBottom: 30 },
  previousPageDisabledBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, width: '46%', paddingVertical: 14, backgroundColor: '#FAFAFA' },
  previousPageDisabledBtnTxt: { color: '#A3A3A3', fontWeight: '700', fontSize: 15 },
  
  nextStepGradientActionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 12, width: '48%', paddingVertical: 14, backgroundColor: '#F97316', shadowColor: '#EA580C', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
  nextStepGradientActionBtnTxt: { color: '#FFF', fontWeight: '800', fontSize: 16 },

  rewardTrophyMessageContainerRow: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 8, gap: 10, marginTop: 5 },
  rewardTrophyIconDesign: { fontSize: 18, marginTop: -2 },
  rewardCaptionCoreBodyDescriptionText: { flex: 1, fontSize: 13.5, fontWeight: '600', color: '#64748B', lineHeight: 20 },
  confidentialDisclaimerInfoText: { fontSize: 13.5, color: '#64748B', textAlign: 'center', paddingHorizontal: 16, marginTop: 16, lineHeight: 20, fontWeight: '400' }
});