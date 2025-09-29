import React from "react";
import { useNetworkState } from "expo-network";
import { Tabs } from "expo-router";
import { Alert } from "react-native";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function AppIndexLayout() {
  const networkState = useNetworkState();

  React.useEffect(() => {
    if (
      !networkState.isConnected &&
      networkState.isInternetReachable === false
    ) {
      Alert.alert(
        "🔌 You are offline",
        "You can keep using the app! Your changes will be saved locally and synced when you are back online."
      );
    }
  }, [networkState.isConnected, networkState.isInternetReachable]);

  return (
    <WidgetProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            borderTopWidth: 1,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="house" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="clients-tab"
          options={{
            title: 'Clients',
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="person.2" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="campaigns-tab"
          options={{
            title: 'Campaigns',
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="megaphone" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics-tab"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="chart.bar" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="reports-tab"
          options={{
            title: 'Reports',
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="doc.text" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </WidgetProvider>
  );
}
