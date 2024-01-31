import { configAxios } from "./src/configs/configAxios";
import { SafeAreaView } from "react-native"
import { stores } from './src/redux/store';
import { Provider } from "react-redux"
import AppRoute from "./AppRoute";

configAxios();
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Provider store={stores}>
        <AppRoute />
      </Provider>
    </SafeAreaView>
  )
}