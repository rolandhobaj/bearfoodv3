import { Tabs } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === "foods" ? "restaurant-menu" : "menu-book";
          return <Icon name={iconName} size={32} color="rgba(18,57,6, 0.9)" />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tabs.Screen name="foods" options={{ title: "Ételek" }} />
      <Tabs.Screen name="recipes" options={{ title: "Receptek" }} />
    </Tabs>
  );
}