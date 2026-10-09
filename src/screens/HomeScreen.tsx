import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useProductsQuery } from '@services/productApi';
import { ProductCard } from '@components/ProductCard';
import { Watermark } from '@components/Watermark';
import { THEME } from '@constants/theme';
import { STUDENT, ROOM_LABEL, DEBOUNCE_MS } from '@constants/student';
import { useDebouncedValue } from '@hooks/useDebouncedValue';

export const HomeScreen = ({ navigation }: any) => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS);
    const { data: products, isLoading, isError, refetch, isRefetching } = useProductsQuery();

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        if (!debouncedSearch.trim()) return products;
        return products.filter((p) =>
            p.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
        );
    }, [products, debouncedSearch]);

    const handleRefresh = () => {
        refetch();
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>KTXGO</Text>
                <Text style={styles.headerSub}>Giao tận {ROOM_LABEL}</Text>
            </View>

            <View style={styles.searchBox}>
                <TextInput
                    style={styles.input}
                    placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                    placeholderTextColor={THEME.textLight}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <View style={styles.listContainer}>
                {isLoading && (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color={THEME.primary} />
                        <Text style={styles.loadingText}>Đang tải món...</Text>
                    </View>
                )}

                {isError && (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
                        <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
                        <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
                            <Text style={styles.retryText}>Thử lại</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!isLoading && !isError && (
                    <FlashList
                        data={filteredProducts}
                        renderItem={({ item }) => (
                            <ProductCard
                                product={item}
                                onPressCard={() => navigation.navigate('Detail', { id: item.id })}
                            />
                        )}
                        numColumns={2}
                        keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`}
                        contentContainerStyle={styles.listContent}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefetching}
                                onRefresh={handleRefresh}
                                colors={[THEME.primary]}
                            />
                        }
                    />
                )}
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
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '900',
    },
    headerSub: {
        color: '#BFDBFE',
        fontSize: 13,
        marginTop: 2,
    },
    searchBox: {
        padding: 12,
        backgroundColor: THEME.background,
    },
    input: {
        backgroundColor: THEME.surface,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: THEME.border,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        color: THEME.text,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 6,
    },
    listContent: {
        paddingBottom: 16,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 12,
        color: THEME.text,
        fontSize: 14,
    },
    errorMssv: {
        color: THEME.error,
        fontWeight: '800',
        fontSize: 16,
        marginBottom: 4,
    },
    errorText: {
        color: THEME.textLight,
        marginBottom: 16,
        fontSize: 14,
    },
    retryBtn: {
        backgroundColor: THEME.error,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
});