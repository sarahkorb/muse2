import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './index'; // WelcomePage (index.tsx)
import SecondPage from './secondPage'; // SecondPage
import ThirdPage from './thirdPage'; // ThirdPage
import FourthPage from './fourthPage'; // FourthPage
import FifthPage from './fifthPage'; // FourthPage
import SixthPage from './sixthPage'; // FourthPage
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
      <Stack.Screen 
        name="FourthPage" 
        component={FourthPage} 
        options={{ title: 'Fourth Page' }} // Optionally set header title
      />
      <Stack.Screen 
        name="FifthPage" 
        component={FifthPage} 
        options={{ title: 'Fifth Page' }} // Optionally set header title
      />
      <Stack.Screen 
        name="SixthPage" 
        component={SixthPage} 
        options={{ title: 'Sixth Page' }} // Optionally set header title
      />
    </Stack.Navigator>
  );
}

