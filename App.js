import 'react-native-gesture-handler';
import Routes from "./src/routes/index";
import { AuthProvider } from './src/contexts/auth';

export default function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}