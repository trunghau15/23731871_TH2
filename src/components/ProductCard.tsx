import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Product } from '@services/productApi';
import { THEME } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

interface Props {
    product: Product;
    onPressCard: () => void;
}

export const ProductCard = ({ product, onPressCard }: Props) => {
    const addItem = useCartStore((state) => state.addItem);

    const handleQuickAdd = () => {
        // Kích hoạt rung loại selection cho số cuối 1
        ReactNativeHapticFeedback.trigger('selection', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
        });
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
        });
    };

    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onPressCard}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                </Text>
                <Text style={styles.price}>{product.price.toLocaleString('vi-VN')} đ</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleQuickAdd}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: THEME.surface,
        borderRadius: 12,
        margin: 6,
        padding: 10,
        borderWidth: 1,
        borderColor: THEME.border,
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        color: THEME.text,
        minHeight: 34,
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: THEME.primary,
        marginTop: 4,
    },
    addButton: {
        position: 'absolute',
        right: 8,
        bottom: 8,
        backgroundColor: THEME.primary,
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 20,
    },
});