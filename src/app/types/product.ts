export type Category = 
    | "All"
    | "Beef"
    | "Chicken"
    | "Pork"
    | "Goat";

export type Product = {
    id: string;
    name: string;
    category: Exclude<Category, "All">;
    price: number;
    unit: "kg";
    image: string;
    description: string;
    featured?: boolean;
};