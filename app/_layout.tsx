import { Tabs } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === "index" ? "restaurant-menu" : "menu-book";
          return <Icon name={iconName} size={32} color="rgba(18,57,6, 0.9)" />;
        },
        tabBarActiveTintColor: "rgba(18,57,6, 0.9)",
        tabBarInactiveTintColor: "white",
        tabBarInactiveBackgroundColor:'gray',
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Ételek" }} />
      <Tabs.Screen name="recipes" options={{ title: "Receptek" }} />
    </Tabs>
  );
}