import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Product } from "@/app/types/product";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  product: Product;
  onPress?: () => void;
  onAdd?: () => void;
};

export default function ProductCard({
  product,
  onPress,
  onAdd,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="mb-4 w-full overflow-hidden rounded-2xl border border-stone-100 bg-white"
    >
      <View className="relative">
        <Image
          source={{ uri: product.image }}
          className="h-36 w-full bg-stone-100"
          resizeMode="cover"
        />

        {product.featured ? (
          <View className="absolute left-2 top-2 rounded-full bg-white px-2 py-1">
            <Text className="text-[10px] font-bold text-red-800">
              POPULAR
            </Text>
          </View>
        ) : null}
      </View>

      <View className="p-3">
        <Text
          numberOfLines={1}
          className="text-base font-bold text-stone-900"
        >
          {product.name}
        </Text>

        <Text className="mt-1 text-xs text-stone-500">
          {product.category}
        </Text>

        <View className="mt-3 flex-row items-center justify-between">
          <View>
            <Text className="text-base font-extrabold text-red-800">
              ${product.price.toFixed(2)}
            </Text>

            <Text className="text-xs text-stone-500">
              per {product.unit}
            </Text>
          </View>

          <TouchableOpacity
            onPress={(event) => {
              event.stopPropagation();
              onAdd?.();
            }}
            className="h-10 w-10 items-center justify-center rounded-xl bg-red-800"
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}