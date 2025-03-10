import { Stack } from "expo-router";
import './globals.css'
import { StatusBar } from "react-native";

const RootLayout = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="watchlist"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ratings"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="search-history"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  )
}

export default RootLayout;