import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context Imports
import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishlistContext'; // Path apne project structure ke hisab se verify kar lein

// Screens import
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import WishlistScreen from './src/screens/WishlistScreen'; // Nayi Wishlist Screen import ki gayi hai
import CategoriesScreen from './src/screens/CategoriesScreen';
import RawChickenScreen from './src/screens/RawChickenScreen';
import TikkaMarinadesScreen from './src/screens/TikkaMarinadesScreen';
import GravyMarinadesScreen from './src/screens/GravyMarinadesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SurveyScreen from './src/screens/SurveyScreen';
import SubscriptionScreen from './src/screens/SubscriptionScreen';
import RawChickenDetailScreen from './src/screens/RawChickenDetailScreen';
import AboutDelwingzAppScreen from './src/screens/AboutDelwingzAppScreen';
import RawChickenKeemaDetailScreen from './src/screens/RawChickenKeemaDetailScreen';
import TikkaMarinadesDetailScreen from './src/screens/TikkaMarinadesDetailScreen';
import AfganKaPathanChickenTikkaDetailScreen from './src/screens/AfganKaPathanChickenTikkaDetailScreen';
import B2BSurveyScreen from './src/screens/B2BSurveyScreen';
import GymSurveyScreen from './src/screens/GymSurveyScreen';
import KeralaCoconutCurryChickenGravyDetailScreen from './src/screens/KeralaCoconutCurryChickenGravyDetailScreen';
import CheesyTomatoChickenTikkaDetailScreen from './src/screens/CheesyTomatoChickenTikkaDetailScreen';
import HelpAndSupportScreen from './src/screens/HelpAndSupportScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerShown: false, 
            }}
          >
            
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
            />

            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
            />

            <Stack.Screen 
              name="Cart" 
              component={CartScreen} 
            />

            {/* Added Wishlist Navigation Gate */}
            <Stack.Screen 
              name="Wishlist" 
              component={WishlistScreen} 
            />

            <Stack.Screen 
              name="Categories" 
              component={CategoriesScreen} 
            />

            <Stack.Screen 
              name="RawChicken" 
              component={RawChickenScreen} 
            />

            <Stack.Screen 
              name="GravyMarinades" 
              component={GravyMarinadesScreen} 
            />

            <Stack.Screen 
              name="TikkaMarinades" 
              component={TikkaMarinadesScreen} 
            />

            <Stack.Screen 
              name="Survey" 
              component={SurveyScreen} 
            />

            <Stack.Screen 
              name="Subscription" 
              component={SubscriptionScreen} 
            />

            <Stack.Screen 
              name="RawChickenDetail" 
              component={RawChickenDetailScreen} 
            />

            <Stack.Screen 
              name="AboutDelwingzApp" 
              component={AboutDelwingzAppScreen} 
            />

            <Stack.Screen 
              name="RawChickenKeemaDetail" 
              component={RawChickenKeemaDetailScreen} 
            />

            <Stack.Screen 
              name="AfganKaPathanChickenTikkaDetail" 
              component={AfganKaPathanChickenTikkaDetailScreen} 
            />

            <Stack.Screen 
              name="TikkaMarinadesDetail" 
              component={TikkaMarinadesDetailScreen} 
            />

            <Stack.Screen 
              name="B2BSurvey" 
              component={B2BSurveyScreen} 
            />

            <Stack.Screen 
              name="GymSurvey" 
              component={GymSurveyScreen} 
            />

            <Stack.Screen 
              name="KeralaCoconutCurryChickenGravyDetail" 
              component={KeralaCoconutCurryChickenGravyDetailScreen} 
            />

            <Stack.Screen 
              name="CheesyTomatoChickenTikkaDetail" 
              component={CheesyTomatoChickenTikkaDetailScreen} 
            />

            <Stack.Screen 
              name="HelpAndSupport" 
              component={HelpAndSupportScreen} 
            />

          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </WishlistProvider>
  );
}