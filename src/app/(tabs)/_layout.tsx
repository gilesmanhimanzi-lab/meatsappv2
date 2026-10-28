import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#991B1B",
                tabBarInactiveTintColor: "#A8A29E",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopColor: "E7E5E4", 
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "600",
                },
            }}
        >
        <Tabs.Screen 
            name="index" 
            options={{ 
                title: "meatsapp",
                tabBarIcon: ({ color, size}) => (
                    <Ionicons
                        name="home-outline"
                        color={color}
                        size={size}
                    />
                ),
            }} 
        />
        <Tabs.Screen 
            name="catalogue" 
            options={{ 
                title: "catalogue",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons
                        name="grid-outline"
                        color={color}
                        size={size}
                    />
                ),
            }} 
        />
    </Tabs>
    );
}

