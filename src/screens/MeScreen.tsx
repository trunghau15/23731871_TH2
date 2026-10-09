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
    const { status, distanceKm, shippingFee, requestLocation } = useCampusLocation();

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            {/* 1. Header xanh đậm */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
            </View>

            <View style={styles.content}>
                {/* 2. Card thông tin sinh viên */}
                <View style={styles.profileCard}>
                    <Text style={styles.name}>{STUDENT.hoTen}</Text>
                    <Text style={styles.subProfile}>
                        {STUDENT.mssv} · #{examStamp()}
                    </Text>
                </View>

                {/* 3. Card trạng thái Location & Phí Ship */}
                <View style={styles.statusCard}>
                    <Text
                        style={[
                            styles.statusText,
                            status === 'granted' ? styles.statusGranted : styles.statusDefault,
                        ]}
                    >
                        Quyền: {status === 'idle' ? 'chưa cấp' : status}
                    </Text>

                    {status === 'granted' && distanceKm !== null && (
                        <>
                            <Text style={styles.distanceText}>≈ {distanceKm} km tới cổng KTX</Text>
                            <Text style={styles.feeTitle}>Phí ship ước tính</Text>
                            <Text style={styles.feeValue}>{shippingFee?.toLocaleString('vi-VN')} đ</Text>
                        </>
                    )}

                    {status === 'denied' && (
                        <Text style={styles.hintText}>Đã từ chối quyền — vui lòng bấm xin lại</Text>
                    )}
                    {status === 'blocked' && (
                        <Text style={styles.hintText}>Quyền bị chặn vĩnh viễn — mở Cài đặt để cấp lại</Text>
                    )}
                </View>

                {/* 4. Nhóm nút chức năng */}
                <View style={styles.actionGroup}>
                    <TouchableOpacity style={styles.btnPrimary} onPress={requestLocation}>
                        <Text style={styles.btnPrimaryText}>Lấy vị trí ước tính ship</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnOutline}
                        onPress={() => Linking.openSettings()}
                    >
                        <Text style={styles.btnOutlineText}>Mở Cài đặt (blocked)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnLogout} onPress={logout}>
                        <Text style={styles.btnLogoutText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 5. Watermark đặt ở cạnh dưới (Số cuối 1: watermarkAtTop = false) */}
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
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    profileCard: {
        backgroundColor: THEME.surface,
        paddingVertical: 18,
        borderRadius: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: THEME.border,
        marginBottom: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: '800',
        color: THEME.text,
    },
    subProfile: {
        fontSize: 13,
        color: THEME.textLight,
        marginTop: 4,
        fontWeight: '500',
    },
    statusCard: {
        backgroundColor: THEME.surface,
        padding: 18,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: THEME.border,
        marginBottom: 20,
        minHeight: 120,
        justifyContent: 'center',
    },
    statusText: {
        fontSize: 15,
        fontWeight: '700',
    },
    statusGranted: {
        color: THEME.success,
    },
    statusDefault: {
        color: THEME.textLight,
    },
    distanceText: {
        fontSize: 14,
        color: THEME.text,
        fontWeight: '600',
        marginTop: 6,
    },
    feeTitle: {
        fontSize: 13,
        color: THEME.textLight,
        marginTop: 10,
    },
    feeValue: {
        fontSize: 22,
        fontWeight: '900',
        color: THEME.secondary,
        marginTop: 2,
    },
    hintText: {
        fontSize: 12,
        color: THEME.error,
        marginTop: 8,
    },
    actionGroup: {
        marginTop: 'auto',
        marginBottom: 12,
    },
    btnPrimary: {
        backgroundColor: THEME.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    btnPrimaryText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    btnOutline: {
        backgroundColor: THEME.surface,
        borderWidth: 1.5,
        borderColor: THEME.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    btnOutlineText: {
        color: THEME.primary,
        fontSize: 15,
        fontWeight: '700',
    },
    btnLogout: {
        backgroundColor: THEME.error,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    btnLogoutText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});