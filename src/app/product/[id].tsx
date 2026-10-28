import Header from "@/components/Header";
import { ScrollView, Text, View } from "react-native";

import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { products } from "../constants/products";

export default function ProductScreen() {
    const { id } = useLocalSearchParams<{id: string}>();

    const product = products.find((item) => item.id === id);

    const [quantity, setQuantity] = useState(1);

    //const totalPrice = product?.price * quantity;

    return (
        
    <View>
        <Header showBack/>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24}}
        >
            <Text>
            Your products
        </Text>

        <View>
            <Image
                source={product?.image}
            />
        </View>

        <Text>
            Description
            {product?.description}
        </Text>

        <Text>
            {product?.price}
        </Text>
        </ScrollView>
    </View>
    )
}