import 'react-native-gesture-handler';

import Routes from "./src/routes";

export default function App() {
  return (
    <Routes/>
  );
}

// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import LoadingScreen from "./src/Screens/LoadingScreen";
// import Home from "./src/Screens/Home";
// import Login from "./src/Screens/Login";
// import SignUp from "./src/Screens/SignUp";
// import Notifications from "./src/Screens/Notifications";
// import Pets from "./src/Screens/Pets";
// import Profile from "./src/Screens/Profile";
// import Post from "./src/Screens/Post";
// import Welcome from "./src/Screens/Welcome";

// import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence, getAuth, onAuthStateChanged } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyAS3vzM3Xdy_8Ca8d8WJvO-qH-NLZvjOk4",
//   authDomain: "seekpet-d3405.firebaseapp.com",
//   projectId: "seekpet-d3405",
//   storageBucket: "seekpet-d3405.appspot.com",
//   messagingSenderId: "673766824790",
//   appId: "1:673766824790:web:8e819c92002effbf3294f7",
//   measurementId: "G-L7LCLG4WL9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// const AppStack = createStackNavigator({
//   // welcome: Welcome,
//   home: Home
// })

// const AuthStack = createStackNavigator({
//   // welcome: Welcome,
//   login: Login,
//   register: SignUp
// })

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       Loading: LoadingScreen,
//       App: AppStack,
//       Auth: AuthStack
//     },
//     {
//       initialRouteName: "Loading"
//     }
//   )
// )