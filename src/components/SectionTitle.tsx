import { Text, View } from "react-native";

type Props = {
    title: string;
    subtitle?: string;
};

export default function SectionTitle({ title, subtitle}: Props) {
    return (
        <View className="mb-4">
            <Text className="text-xl font-extrabold text-stone-900">
                {title}
            </Text>

            {subtitle ? (
                <View className="mt-1 text-sm text-stone-500">
                    <Text>{subtitle}</Text>
                </View>
            ) : null}
        </View>
    );
} 