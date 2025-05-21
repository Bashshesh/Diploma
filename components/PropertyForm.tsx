import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

interface PropertyFormProps {
    onSubmit: (data: {
        title: string;
        price: number;
        description: string;
        type: string;
        bedrooms: number;
        bathrooms: number;
        area: number;
    }) => void;
    initialData?: {
        title: string;
        price: number;
        description: string;
        type: string;
        bedrooms: number;
        bathrooms: number;
        area: number;
    } | null;
}

export default function PropertyForm({ onSubmit, initialData }: PropertyFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [price, setPrice] = useState(initialData?.price?.toString() || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [type, setType] = useState(initialData?.type || "");
    const [bedrooms, setBedrooms] = useState(initialData?.bedrooms?.toString() || "");
    const [bathrooms, setBathrooms] = useState(initialData?.bathrooms?.toString() || "");
    const [area, setArea] = useState(initialData?.area?.toString() || "");

    const handleSubmit = () => {
        if (!title || !price || !description || !type || !bedrooms || !bathrooms || !area) {
            alert("Заполните все поля!");
            return;
        }

        onSubmit({
            title,
            price: parseFloat(price),
            description,
            type,
            bedrooms: parseInt(bedrooms),
            bathrooms: parseInt(bathrooms),
            area: parseFloat(area),
        });

        // Сброс формы после создания (но не при редактировании)
        if (!initialData) {
            setTitle("");
            setPrice("");
            setDescription("");
            setType("");
            setBedrooms("");
            setBathrooms("");
            setArea("");
        }
    };

    return (
        <View className="p-4 mb-4 bg-gray-100 rounded-lg">
            <TextInput
                className="p-2 mb-2 border rounded"
                placeholder="Название объекта"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                className="p-2 mb-2 border rounded"
                placeholder="Цена (₽)"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                className="p-2 mb-2 border rounded"
                placeholder="Описание"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />
            <TextInput
                className="p-2 mb-2 border rounded"
                placeholder="Тип (например, Apartment, House)"
                value={type}
                onChangeText={setType}
            />
            <TextInput
                className="p-2 mb-2 border rounded"
                placeholder="Количество спален"
                value={bedrooms}
                onChangeText={setBedrooms}
                keyboardType="numeric"
            />
            <TextInput
                className="p-2 mb-2 border rounded"
                placeholder="Количество ванных комнат"
                value={bathrooms}
                onChangeText={setBathrooms}
                keyboardType="numeric"
            />
            <TextInput
                className="p-2 mb-2 border rounded"
                placeholder="Площадь (м²)"
                value={area}
                onChangeText={setArea}
                keyboardType="numeric"
            />
            <Button
                title={initialData ? "Сохранить изменения" : "Создать объект"}
                onPress={handleSubmit}
            />
            {initialData && (
                <Button
                    title="Отменить редактирование"
                    color="gray"
                    onPress={() => {
                        setTitle("");
                        setPrice("");
                        setDescription("");
                        setType("");
                        setBedrooms("");
                        setBathrooms("");
                        setArea("");
                    }}
                />
            )}
        </View>
    );
}