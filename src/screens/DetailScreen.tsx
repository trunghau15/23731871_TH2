import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useQueryClient } from '@tanstack/react-query';
import { Product } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';
import { THEME } from '@constants/theme';
import { STUDENT } from '@constants/student';
import { Watermark } from '@components/Watermark';

export const DetailScreen = ({ route, navigation }: any) => {
    const { id } = route.params;
    const queryClient = useQueryClient();
    const products = queryClient.getQueryData<Product[]>(['products']) || [];
    const product = products.find((p) => p.id === id);

    const addItem = useCartStore((state) => state.addItem);

    if (!product) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Text style={{ textAlign: 'center', marginTop: 30 }}>Không tìm thấy sản phẩm</Text>
            </SafeAreaView>
        );
    }

    const handleAddToCart = () => {
        // Haptic selection theo số cuối 1 của MSSV 23731871
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
        Alert.alert('Thành công', `Đã thêm món vào giỏ! [${STUDENT.mssv}]`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backText}>← Chi tiết món</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{product.price.toLocaleString('vi-VN')} đ</Text>
                <Text style={styles.subInfo}>Giao nội khu · nhận tận phòng</Text>

                <Text style={styles.desc} numberOfLines={3}>
                    {product.description}
                </Text>

                <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
                    <Text style={styles.addBtnText}>Thêm vào giỏ · Haptic</Text>
                </TouchableOpacity>
            </View>

            <Watermark />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: THEME.background,
    },
    headerNav: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: THEME.border,
        backgroundColor: THEME.surface,
    },
    backBtn: {
        paddingVertical: 4,
    },
    backText: {
        fontSize: 16,
        fontWeight: '700',
        color: THEME.primary,
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: THEME.surface,
        margin: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: THEME.border,
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        color: THEME.text,
        textAlign: 'center',
    },
    price: {
        fontSize: 20,
        fontWeight: '900',
        color: THEME.primary,
        marginVertical: 8,
    },
    subInfo: {
        fontSize: 13,
        color: THEME.textLight,
        marginBottom: 14,
    },
    desc: {
        fontSize: 14,
        color: THEME.text,
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 24,
    },
    addBtn: {
        backgroundColor: THEME.primary,
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 'auto',
    },
    addBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});