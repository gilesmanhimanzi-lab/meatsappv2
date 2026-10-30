import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Header from "../components/Header";
import { useCartStore } from "../store/cart";

export default function CartScreen() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );
  const removeItem = useCartStore((state) => state.removeItem);
  const getSubtotal = useCartStore((state) => state.getSubtotal);

  const subtotal = getSubtotal();

  return (
    <View className="flex-1 bg-stone-50">
      <Header showBack />

      <View className="px-5 pb-4 pt-3">
        <Text className="text-2xl font-extrabold text-stone-900">
          Your cart
        </Text>

        <Text className="mt-1 text-sm text-stone-500">
          Review your selection before checkout.
        </Text>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-red-50">
            <Ionicons
              name="cart-outline"
              size={46}
              color="#991B1B"
            />
          </View>

          <Text className="mt-6 text-xl font-extrabold text-stone-900">
            Your cart is empty
          </Text>

          <Text className="mt-2 text-center leading-6 text-stone-500">
            Browse our catalogue and add your favourite cuts.
          </Text>

          <TouchableOpacity
            onPress={() => router.replace("/catalogue")}
            className="mt-6 rounded-xl bg-red-800 px-6 py-4"
          >
            <Text className="font-bold text-white">
              Browse catalogue
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {items.map(({ product, quantity }) => (
              <View
                key={product.id}
                className="mb-4 flex-row rounded-2xl border border-stone-100 bg-white p-3"
              >
                <Image
                  source={{ uri: product.image }}
                  className="h-28 w-24 rounded-xl bg-stone-100"
                  resizeMode="cover"
                />

                <View className="ml-3 flex-1 justify-between py-1">
                  <View>
                    <Text className="text-base font-bold text-stone-900">
                      {product.name}
                    </Text>

                    <Text className="mt-1 text-xs text-stone-500">
                      ${product.price.toFixed(2)} / {product.unit}
                    </Text>

                    <Text className="mt-2 text-base font-extrabold text-red-800">
                      ${(product.price * quantity).toFixed(2)}
                    </Text>
                  </View>

                  <View className="mt-3 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() => decreaseQuantity(product.id)}
                        className="h-8 w-8 items-center justify-center rounded-lg border border-stone-200"
                      >
                        <Ionicons
                          name="remove"
                          size={18}
                          color="#292524"
                        />
                      </TouchableOpacity>

                      <Text className="mx-3 font-bold text-stone-900">
                        {quantity}
                      </Text>

                      <TouchableOpacity
                        onPress={() => increaseQuantity(product.id)}
                        className="h-8 w-8 items-center justify-center rounded-lg bg-red-800"
                      >
                        <Ionicons
                          name="add"
                          size={18}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          "Remove item",
                          `Remove ${product.name} from your cart?`,
                          [
                            {
                              text: "Keep item",
                              style: "cancel",
                            },
                            {
                              text: "Remove",
                              style: "destructive",
                              onPress: () => removeItem(product.id),
                            },
                          ]
                        )
                      }
                      accessibilityLabel={`Remove ${product.name}`}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={21}
                        color="#B91C1C"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Cart summary */}
          <View className="border-t border-stone-200 bg-white px-5 pb-6 pt-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-base text-stone-500">
                Subtotal
              </Text>

              <Text className="text-xl font-extrabold text-stone-900">
                ${subtotal.toFixed(2)}
              </Text>
            </View>

            <Text className="mt-2 text-xs leading-5 text-stone-500">
              Delivery fees, if applicable, will be calculated at checkout.
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/checkout")}
              className="mt-5 flex-row items-center justify-center rounded-xl bg-red-800 py-4"
            >
              <Text className="font-bold text-white">
                Proceed to checkout
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color="#FFFFFF"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
