import { useMemo, useState } from "react";

import {
    Alert,
    KeyboardAvoidingView,
    Linking,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Header from "../components/Header";
import { useCartStore } from "../store/cart";

const BUTCHERY_WHATSAPP = "263771234567";

type FulfilmentMethod = "delivery" | "collection";

export default function CheckoutScreen() {
  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [fulfilment, setFulfilment] =
    useState<FulfilmentMethod>("delivery");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getSubtotal();

  const orderReference = useMemo(
    () =>
      `PC-${Date.now().toString().slice(-8)}`,
    []
  );

  const formatMoney = (amount: number) =>
    `$${amount.toFixed(2)}`;

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      Alert.alert(
        "Your cart is empty",
        "Add some products before proceeding to checkout."
      );

      return;
    }

    if (!customerName.trim()) {
      Alert.alert(
        "Name required",
        "Please enter your name."
      );

      return;
    }

    if (!phone.trim() || phone.trim().length < 7) {
      Alert.alert(
        "Phone number required",
        "Please enter a valid contact number."
      );

      return;
    }

    if (fulfilment === "delivery" && !address.trim()) {
      Alert.alert(
        "Delivery address required",
        "Please enter the address where your order should be delivered."
      );

      return;
    }

    if (
      !/^\d{8,15}$/.test(BUTCHERY_WHATSAPP)
    ) {
      Alert.alert(
        "Configuration required",
        "Please configure the butchery's WhatsApp number in app/checkout.tsx."
      );

      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = items
        .map(({ product, quantity }) => {
          const lineTotal = product.price * quantity;

          return [
            `• ${product.name}`,
            `  Quantity: ${quantity} ${product.unit}`,
            `  Unit price: ${formatMoney(product.price)} per ${product.unit}`,
            `  Line total: ${formatMoney(lineTotal)}`,
          ].join("\n");
        })
        .join("\n\n");

      const message = [
        "🛒 *NEW BUTCHERY ORDER*",
        "",
        `Order reference: ${orderReference}`,
        "",
        "*CUSTOMER DETAILS*",
        `Name: ${customerName.trim()}`,
        `Phone: ${phone.trim()}`,
        "",
        "*FULFILMENT*",
        `Method: ${fulfilment === "delivery" ? "Delivery" : "Collection"}`,
        ...(fulfilment === "delivery"
          ? [`Address: ${address.trim()}`]
          : []),
        "",
        "*ORDER ITEMS*",
        orderItems,
        "",
        "*ORDER SUMMARY*",
        `Subtotal: ${formatMoney(subtotal)}`,
        "Delivery fee: To be confirmed by the butchery",
        `Estimated total before delivery: ${formatMoney(subtotal)}`,
        "",
        `Notes: ${notes.trim() || "None"}`,
        "",
        "Please confirm availability and the final order total.",
      ].join("\n");

      const whatsappUrl =
        `https://wa.me/${BUTCHERY_WHATSAPP}` +
        `?text=${encodeURIComponent(message)}`;

      await Linking.openURL(whatsappUrl);

      Alert.alert(
        "Almost done!",
        "WhatsApp has been opened with your order details. Send the message to the butchery to submit your order.",
        [
          {
            text: "Return to cart",
            style: "cancel",
          },
          {
            text: "I've sent the order",
            onPress: () => {
              clearCart();
              router.replace("/(tabs)");
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Unable to open WhatsApp",
        "Your cart is still saved. Please try again or contact the butchery directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-stone-50">
        <Header showBack />

        <View className="flex-1 items-center justify-center px-6">
          <Ionicons
            name="cart-outline"
            size={56}
            color="#991B1B"
          />

          <Text className="mt-4 text-xl font-extrabold text-stone-900">
            Your cart is empty
          </Text>

          <Text className="mt-2 text-center text-stone-500">
            Add products before checking out.
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
      </View>
    );
  }

  return (
    <View className="flex-1 bg-stone-50">
      <Header showBack />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <View className="px-5 pb-5 pt-3">
            <Text className="text-2xl font-extrabold text-stone-900">
              Checkout
            </Text>

            <Text className="mt-2 text-sm leading-6 text-stone-500">
              Enter your details so we can prepare your order.
            </Text>

            {/* Customer details */}
            <View className="mt-6 rounded-2xl bg-white p-5">
              <Text className="text-lg font-bold text-stone-900">
                Customer details
              </Text>

              <Text className="mb-2 mt-5 text-sm font-semibold text-stone-700">
                Full name *
              </Text>

              <TextInput
                value={customerName}
                onChangeText={setCustomerName}
                placeholder="Enter your full name"
                className="rounded-xl border border-stone-200 px-4 py-3 text-stone-900"
                autoCapitalize="words"
                accessibilityLabel="Full name"
              />

              <Text className="mb-2 mt-4 text-sm font-semibold text-stone-700">
                Phone number *
              </Text>

              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                className="rounded-xl border border-stone-200 px-4 py-3 text-stone-900"
                keyboardType="phone-pad"
                accessibilityLabel="Phone number"
              />
            </View>

            {/* Fulfilment method */}
            <View className="mt-5 rounded-2xl bg-white p-5">
              <Text className="text-lg font-bold text-stone-900">
                How would you like your order?
              </Text>

              <View className="mt-4 flex-row">
                <TouchableOpacity
                  onPress={() => setFulfilment("delivery")}
                  className={`mr-3 flex-1 rounded-xl border p-4 ${
                    fulfilment === "delivery"
                      ? "border-red-800 bg-red-50"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <Ionicons
                    name="bicycle-outline"
                    size={25}
                    color="#991B1B"
                  />

                  <Text className="mt-2 font-bold text-stone-900">
                    Delivery
                  </Text>

                  <Text className="mt-1 text-xs text-stone-500">
                    Bring my order to me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setFulfilment("collection")}
                  className={`flex-1 rounded-xl border p-4 ${
                    fulfilment === "collection"
                      ? "border-red-800 bg-red-50"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <Ionicons
                    name="storefront-outline"
                    size={25}
                    color="#991B1B"
                  />

                  <Text className="mt-2 font-bold text-stone-900">
                    Collection
                  </Text>

                  <Text className="mt-1 text-xs text-stone-500">
                    I'll collect my order
                  </Text>
                </TouchableOpacity>
              </View>

              {fulfilment === "delivery" && (
                <>
                  <Text className="mb-2 mt-5 text-sm font-semibold text-stone-700">
                    Delivery address *
                  </Text>

                  <TextInput
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Suburb, street, house number and directions"
                    multiline
                    textAlignVertical="top"
                    className="min-h-24 rounded-xl border border-stone-200 px-4 py-3 text-stone-900"
                    accessibilityLabel="Delivery address"
                  />

                  <Text className="mt-2 text-xs leading-5 text-stone-500">
                    The butchery will confirm whether delivery is available and advise the delivery fee.
                  </Text>
                </>
              )}
            </View>

            {/* Notes */}
            <View className="mt-5 rounded-2xl bg-white p-5">
              <Text className="text-lg font-bold text-stone-900">
                Order notes
              </Text>

              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Optional preparation instructions or other requests"
                multiline
                textAlignVertical="top"
                className="mt-4 min-h-24 rounded-xl border border-stone-200 px-4 py-3 text-stone-900"
                accessibilityLabel="Order notes"
              />
            </View>

            {/* Order summary */}
            <View className="mt-5 rounded-2xl bg-white p-5">
              <Text className="text-lg font-bold text-stone-900">
                Order summary
              </Text>

              <Text className="mt-1 text-xs text-stone-500">
                Reference: {orderReference}
              </Text>

              {items.map(({ product, quantity }) => (
                <View
                  key={product.id}
                  className="mt-4 flex-row items-start justify-between"
                >
                  <View className="mr-4 flex-1">
                    <Text className="font-semibold text-stone-800">
                      {product.name}
                    </Text>

                    <Text className="mt-1 text-xs text-stone-500">
                      {quantity} {product.unit} ×{" "}
                      {formatMoney(product.price)}
                    </Text>
                  </View>

                  <Text className="font-bold text-stone-900">
                    {formatMoney(product.price * quantity)}
                  </Text>
                </View>
              ))}

              <View className="my-5 border-t border-stone-200" />

              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-stone-600">
                  Subtotal
                </Text>

                <Text className="text-xl font-extrabold text-red-800">
                  {formatMoney(subtotal)}
                </Text>
              </View>

              <Text className="mt-3 text-xs leading-5 text-stone-500">
                The final amount may change if the butchery applies a delivery fee or confirms a different packed weight.
              </Text>
            </View>

            {/* Place order */}
            <TouchableOpacity
              onPress={handlePlaceOrder}
              disabled={isSubmitting}
              className={`mt-6 flex-row items-center justify-center rounded-xl py-4 ${
                isSubmitting ? "bg-red-400" : "bg-red-800"
              }`}
            >
              <Ionicons
                name="logo-whatsapp"
                size={21}
                color="#FFFFFF"
              />

              <Text className="ml-2 font-bold text-white">
                {isSubmitting
                  ? "Opening WhatsApp..."
                  : "Place order via WhatsApp"}
              </Text>
            </TouchableOpacity>

            <Text className="mt-3 text-center text-xs leading-5 text-stone-500">
              Your order is submitted only after you send the WhatsApp message.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
