import { Stack } from "expo-router";
import './globals.css'
import { StatusBar } from "react-native";

const RootLayout = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack screenOptions={{
        headerShown: false,
        gestureEnabled: true, // Enable swipe back gesture
        gestureDirection: 'horizontal'
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="movie/[id]" />
      </Stack>
    </>
  )
}

export default RootLayout;