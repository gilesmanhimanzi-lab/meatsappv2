import { Category } from "@/app/types/product";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

const categoryIcons: Record<
  Exclude<Category, "All">,
  keyof typeof Ionicons.glyphMap
> = {
  Beef: "restaurant-outline",
  Chicken: "egg-outline",
  Pork: "fast-food-outline",
  Goat: "leaf-outline",
};

type Props = {
  name: Exclude<Category, "All">;
  onPress?: () => void;
};

export default function CategoryCard({ name, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mr-3 w-24 items-center rounded-2xl border border-stone-100 bg-white px-3 py-4"
    >
      <Ionicons
        name={categoryIcons[name]}
        size={27}
        color="#991B1B"
      />

      <Text className="mt-2 text-center text-xs font-semibold text-stone-700">
        {name}
      </Text>
    </TouchableOpacity>
  );
}