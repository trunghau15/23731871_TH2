import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STUDENT, examStamp } from '@constants/student';
import { THEME } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { Watermark } from '@components/Watermark';

export const MeScreen = () => {
    const logout = useAuthStore((state) => state.logout);
    const token = useAuthStore((state) => state.token);
    const { status, distanceKm, shippingFee, requestLocation } = useCampusLocation();

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
            </View>

            <View style={styles.profileBox}>
                <Text style={styles.name}>{STUDENT.hoTen}</Text>
                <Text style={styles.subProfile}>
                    {STUDENT.mssv} · #{examStamp()}
                </Text>
                <Text style={styles.tokenText} numberOfLines={1}>
                    Token: {token}
                </Text>
            </View>

            <View style={styles.statusBox}>
                <Text style={[styles.statusText, status === 'granted' && { color: THEME.success }]}>
                    Quyền: {status}
                </Text>
                {status === 'granted' && distanceKm !== null && (
                    <>
                        <Text style={styles.distanceText}>≈ {distanceKm} km tới cổng KTX</Text>
                        <Text style={styles.feeTitle}>Phí ship ước tính (công thức B):</Text>
                        <Text style={styles.feeValue}>{shippingFee?.toLocaleString('vi-VN')} đ</Text>
                    </>
                )}
            </View>

            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.actionBtn} onPress={requestLocation}>
                    <Text style={styles.actionBtnText}>Lấy vị trí ước tính ship</Text>
                </TouchableOpacity>

                {status === 'blocked' && (
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.settingBtn]}
                        onPress={() => Linking.openSettings()}
                    >
                        <Text style={styles.settingBtnText}>Mở Cài đặt (blocked)</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Text style={styles.logoutBtnText}>Đăng xuất</Text>
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
    profileBox: {
        backgroundColor: THEME.surface,
        padding: 20,
        alignItems: 'center',
        margin: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: THEME.border,
    },
    name: {
        fontSize: 20,
        fontWeight: '800',
        color: THEME.text,
    },
    subProfile: {
        fontSize: 14,
        color: THEME.textLight,
        marginTop: 4,
    },
    tokenText: {
        fontSize: 11,
        color: THEME.textLight,
        marginTop: 8,
    },
    statusBox: {
        backgroundColor: THEME.surface,
        marginHorizontal: 14,
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: THEME.border,
        alignItems: 'center',
    },
    statusText: {
        fontSize: 16,
        fontWeight: '700',
        color: THEME.textLight,
    },
    distanceText: {
        fontSize: 14,
        color: THEME.text,
        marginTop: 6,
    },
    feeTitle: {
        fontSize: 13,
        color: THEME.textLight,
        marginTop: 10,
    },
    feeValue: {
        fontSize: 24,
        fontWeight: '900',
        color: THEME.secondary,
        marginTop: 2,
    },
    actionContainer: {
        marginTop: 'auto',
        padding: 14,
    },
    actionBtn: {
        backgroundColor: THEME.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    actionBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    settingBtn: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: THEME.primary,
    },
    settingBtnText: {
        color: THEME.primary,
        fontSize: 15,
        fontWeight: '700',
    },
    logoutBtn: {
        backgroundColor: THEME.error,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});