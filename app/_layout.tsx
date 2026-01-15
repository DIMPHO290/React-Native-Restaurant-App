// app/_layout.tsx
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/state/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
