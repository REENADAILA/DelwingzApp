import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';

type TopNavBarProps = {
  title: string;
  subTitle?: string; 
  isBulkOrder: boolean;
  onToggleBulkOrder: () => void;
  onSearchPress?: () => void;
  onMenuPress?: () => void;
};

export const TopNavBar: React.FC<TopNavBarProps> = ({
  title,
  subTitle,
  isBulkOrder,
  onToggleBulkOrder,
  onSearchPress,
  onMenuPress,
}) => {
  return (
    <LinearGradient
      colors={['#80001D', '#B8002A', '#D90429']}
      style={styles.headerGradient}
    >
      <SafeAreaView>
        <View style={styles.navbar}>
          <Text style={styles.logoText}>Delwingz</Text>

          <View style={styles.toggleContainer}>
            <Switch
              trackColor={{ false: '#767577', true: '#E63946' }}
              thumbColor={isBulkOrder ? '#FFF' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={onToggleBulkOrder}
              value={isBulkOrder}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
            <Text style={styles.toggleText}>Bulk Order</Text>
          </View>

          <View style={styles.iconGroup}>
            <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
              <FeatherIcon name="search" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
              <FeatherIcon name="menu" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.mainTitle}>{title}</Text>
          {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingBottom: 40,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 12,
    borderRadius: 25,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    fontStyle: 'italic',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  toggleText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 6,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
    padding: 4,
  },
  headerContent: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    lineHeight: 38,
  },
  subTitle: {
    fontSize: 15,
    color: '#FFCCD5',
    marginTop: 12,
    lineHeight: 22,
  },
});