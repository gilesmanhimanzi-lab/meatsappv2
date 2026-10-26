import { Tabs } from "expo-router";

const TabLayout = () => (
    <Tabs>
        <Tabs.Screen name="index" options={{ title: "meatsapp"}} />
        <Tabs.Screen name="catalogue" options={{ title: "catalogue"}} />
    </Tabs>
)

export default TabLayout;