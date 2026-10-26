import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


import Header from "../../components/Header";

import CategoryCard from '@/components/CategoryCard';
import SectionTitle from '@/components/SectionTitle';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { products } from "../constants/products";



const categories = [
   "Beef",
  "Chicken",
  "Pork",
  "Goat",
] as const;

export default function HomeScreen() {
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <View className="flex-1 bg-stone-50">
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30}}
      >
        <View className="mx-3 mt-3 overflow-hidden rounded-3xl bg-red-900 p-6">
          <View className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-red-800" />

          <Text className="text-xs font-bold uppercase tracking-widest text-red-200">
            Welcome to meatsapp
          </Text>

          <Text className="mt-3 text-3xl font-extrabold leading-10 text-white">
            Better meals for everyone
          </Text>

          <Text className="mt-3 max-w-64 text-sm leading-6 text-red-100">
            Everyday meals , gatherings, cooking as a group
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/catalogue")}
            className="mt-6 flex-row items-center self-start rounded-xl bg-white px-5 py-3"
          >
            <Text className="mr-2 font-bold text-red-900">
              See what's fresh today
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color="#7F1D1D"
            />
          </TouchableOpacity>

        </View>

        <View className="px-5 pt-8">
          <SectionTitle
            title="good food/meat, good life"
            subtitle="From your trusted neighbourhood butchery"
          />

          <Text className="text-sm leading-6 text-stone-600">
            At Prime Cuts, we believe every great meal starts
            with quality ingredients. Explore our selection of
            beef, chicken, pork, sausages, and braai favourites
            for your next family meal.
          </Text>
        </View>

        <View className="pt-8">
          <View className="px-5">
            <SectionTitle
              title="Type yese"
              subtitle="Find what your are looking for"
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category}
                name={category}
                onPress={() =>
                    router.push({
                      pathname: "/catalogue",
                      params: { category },
                    })
                }
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
