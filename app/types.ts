export type RootStackParamList = {
    WelcomePage: undefined;  // No parameters for WelcomePage
    SecondPage: undefined;   // No parameters for SecondPage
    ThirdPage: undefined;
    FourthPage: { habit: string };  
    FifthPage: { selectedImages: string[]; habit: string }; 
    SixthPage: { images: string[]; habit: string; selectedSongs: string[] };  // No parameters for ThirdPage
  };