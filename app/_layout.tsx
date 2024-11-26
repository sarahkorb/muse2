import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './index'; // WelcomePage (index.tsx)
import SecondPage from './secondPage'; // SecondPage
import ThirdPage from './thirdPage'; // ThirdPage
import { RootStackParamList } from './types'; // Import navigation types

// Create the stack navigator with RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

export default function Layout() {
  return (
    <Stack.Navigator initialRouteName="WelcomePage">
      <Stack.Screen 
        name="WelcomePage" 
        component={WelcomePage} 
        options={{ headerShown: false }} // Hide header for the WelcomePage
      />
      <Stack.Screen 
        name="SecondPage" 
        component={SecondPage} 
        options={{ title: 'Second Page' }} // Optionally set header title
      />
      <Stack.Screen 
        name="ThirdPage" 
        component={ThirdPage} 
        options={{ title: 'Third Page' }} // Optionally set header title
      />
    </Stack.Navigator>
  );
}

