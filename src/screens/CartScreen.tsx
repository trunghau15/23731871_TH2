import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '@stores/cartStore';
import { THEME } from '@constants/theme';
import { ROOM_LABEL } from '@constants/student';
import { Watermark } from '@components/Watermark';

export const CartScreen = () => {
    const { items, removeItem, changeQty, totalAmount } = useCartStore();

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.cartCard}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.itemTitle} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <Text style={styles.itemPrice}>
                                ×{item.quantity} {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                            </Text>
                            <View style={styles.qtyRow}>
                                <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id, -1)}>
                                    <Text style={styles.qtyBtnText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.qtyText}>{item.quantity}</Text>
                                <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id, 1)}>
                                    <Text style={styles.qtyBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.deleteBtn} onPress={() => removeItem(item.id)}>
                            <Text style={styles.deleteText}>🗑</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Chưa có món nào trong giỏ hàng</Text>
                }
            />

            <View style={styles.summaryCard}>
                <Text style={styles.roomText}>Giao đến {ROOM_LABEL}</Text>
                <Text style={styles.shipInfo}>Chưa ước tính phí — mở tab Tôi để lấy GPS</Text>
                <Text style={styles.totalText}>
                    Tổng hàng: {totalAmount().toLocaleString('vi-VN')} đ
                </Text>
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
    header: {
        backgroundColor: THEME.primary,
        paddingVertical: 14,
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '900',
    },
    listContent: {
        padding: 12,
    },
    cartCard: {
        flexDirection: 'row',
        backgroundColor: THEME.surface,
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: THEME.border,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: THEME.text,
    },
    itemPrice: {
        fontSize: 13,
        color: THEME.textLight,
        marginTop: 4,
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    qtyBtn: {
        backgroundColor: THEME.border,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 4,
    },
    qtyBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    qtyText: {
        marginHorizontal: 12,
        fontSize: 14,
        fontWeight: '600',
    },
    deleteBtn: {
        backgroundColor: THEME.error,
        padding: 10,
        borderRadius: 8,
        marginLeft: 8,
    },
    deleteText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: THEME.textLight,
    },
    summaryCard: {
        backgroundColor: THEME.surface,
        margin: 12,
        padding: 14,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: THEME.secondary,
    },
    roomText: {
        fontSize: 14,
        fontWeight: '700',
        color: THEME.text,
    },
    shipInfo: {
        fontSize: 13,
        color: THEME.secondary,
        fontWeight: '600',
        marginVertical: 4,
    },
    totalText: {
        fontSize: 16,
        fontWeight: '900',
        color: THEME.primary,
        marginTop: 4,
    },
});