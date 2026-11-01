import { useState } from "react";

import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import Header from "../../components/Header";
import { useCartStore } from "../../store/cart";
import { products } from "../constants/products";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const product = products.find((item) => item.id === id);

  const [amount, setAmount] = useState("10");

  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <View className="flex-1 bg-stone-50">
        <Header showBack />

        <View className="flex-1 items-center justify-center px-6">
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color="#991B1B"
          />

          <Text className="mt-4 text-xl font-bold text-stone-900">
            Product not found
          </Text>

          <TouchableOpacity
            onPress={() => router.replace("/catalogue")}
            className="mt-5 rounded-xl bg-red-800 px-6 py-3"
          >
            <Text className="font-bold text-white">
              Browse catalogue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const NumericAmount = Number(amount);

  const validAmount = 
    amount.trim() !== "" &&
    Number.isFinite(NumericAmount) &&
    NumericAmount > 0; 

  const quantity = validAmount
    ? NumericAmount / product.price
    : 0;

  const handleAddToCart = () => {
    if (!validAmount) {
      Alert.alert(
        "Invalid amount",
        "Enter a valid amount",
      );
      return;
    }
    addItem(product, NumericAmount);

    Alert.alert(
      "Added to cart",
      `$${NumericAmount.toFixed(2)} worth of (${quantity.toFixed(3)} kg) added to your cart.`,
      [
        {
          text: "Continue shopping",
          onPress: () => router.back(),
        },
        {
          text: "View cart",
          onPress: () => router.push("/cart"),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-stone-50">
      <Header showBack />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Product image */}
        <Image
          source={{ uri: product.image }}
          className="h-80 w-full bg-stone-200"
          resizeMode="cover"
        />

        <View className="px-5 pt-6">
          {/* Category */}
          <View className="self-start rounded-full bg-red-100 px-3 py-1.5">
            <Text className="text-xs font-bold text-red-800">
              {product.category}
            </Text>
          </View>

          {/* Product name */}
          <Text className="mt-3 text-3xl font-extrabold text-stone-900">
            {product.name}
          </Text>

          {/* Price */}
          <View className="mt-3 flex-row items-baseline">
            <Text className="text-2xl font-extrabold text-red-800">
              ${product.price.toFixed(2)}
            </Text>

            <Text className="ml-2 text-sm text-stone-500">
              per {product.unit}
            </Text>
          </View>

          {/* Description */}
          <View className="mt-6">
            <Text className="text-lg font-bold text-stone-900">
              About this product
            </Text>

            <Text className="mt-2 text-base leading-7 text-stone-600">
              {product.description}
            </Text>
          </View>

          {/* Quantity selector */}
          <View className="mt-7 rounded-2xl border border-stone-200 bg-white p-4">
            <Text className="text-base font-bold text-stone-900">
              For how much?
            </Text>

            <View className="mt-4 flex-row items-center justify-between rounded-xl border border-stone-200 px-4">
              
                <Text className="text-sm text-stone-500">
                  Quantity
                </Text>

                <Text className="text-xl font-extrabold text-stone-900">
                  $
                </Text>

                <TextInput
                  value={amount}
                  onChangeText={(value) => 
                    setAmount(value.replace(/[^0-9.]/g, ""))
                  }
                  keyboardType="decimal-pad"
                  placeholder="Enter amount"
                  className="flex-1 px-3 py-4 text-xl font-bold text-stone-900"
                />
            </View>

            <View className="mt-4 flex-row justify-between">
              {[2, 5, 10, 20 , 50].map((value) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => setAmount(value.toString())}
                  className={`rounde-lg border px-4 py-2 ${
                    amount === value.toString()
                      ? "border-red-800 bg-red-50"
                      : "border-stone-200"
                  }`}
                >
                  <Text className="font-bold text-stone-700">
                    ${value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="mt-5 rounded-xl bg-stone-50 p-4">
              <Text className="text-sm text-stone-500">
                You'll receive 
              </Text>

              <Text className="mt-1 text-3xl font-extrabold text-red-800">
                {quantity.toFixed(3)} kg
              </Text>

              <Text className="mt-2 text-sm text-amber-500">
                (${product.price.toFixed(2)} per kg)
              </Text>
            </View>
          </View>

          {/* Order total */}
          <View className="mt-6 flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-stone-500">
                Total price
              </Text>

              <Text className="mt-1 text-2xl font-extrabold text-stone-900">
                ${validAmount ? NumericAmount.toFixed(2) : "0.00"}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleAddToCart}
              className={`flex-row items-center rounded-xl bg-red-800 px-5 py-4 ${
                validAmount ? "bg-red-800" : "bg-stone-300"
              }`}
            >
              <Ionicons
                name="cart-outline"
                size={20}
                color="#FFFFFF"
              />

              <Text className="ml-2 font-bold text-white">
                Add to cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
