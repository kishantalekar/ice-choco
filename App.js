import Navigation from "./Navigation/Navigation";
import "react-native-url-polyfill/auto";
import store from "./store";
import { Provider } from "react-redux";
import { ToastProvider } from "react-native-toast-notifications";
export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider swipeEnabled={true} offsetBottom={120}>
        <Navigation />
      </ToastProvider>
    </Provider>
  );
}
