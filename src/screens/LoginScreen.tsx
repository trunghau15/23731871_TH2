import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '@constants/theme';
import { STUDENT, examStamp } from '@constants/student';
import { useAuthStore } from '@stores/authStore';
import { Watermark } from '@components/Watermark';

export const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const login = useAuthStore((state) => state.login);

    const handleLogin = () => {
        if (!phone.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại hợp lệ');
            return;
        }
        const token = `ktxgo-${STUDENT.mssv}-${examStamp()}`;
        login(token);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.brand}>KTXGO</Text>
                <Text style={styles.subTitle}>Giao đồ tận phòng ký túc xá</Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder={`Số điện thoại — ${STUDENT.mssv}`}
                        placeholderTextColor={THEME.textLight}
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />

                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                        <Text style={styles.loginBtnText}>Vào cửa hàng</Text>
                    </TouchableOpacity>

                    <Text style={styles.footerHint}>Auth Stack · chưa có token</Text>
                </View>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    brand: {
        fontSize: 34,
        fontWeight: '900',
        color: THEME.primary,
        letterSpacing: 1,
    },
    subTitle: {
        fontSize: 14,
        color: THEME.textLight,
        marginTop: 6,
        marginBottom: 40,
    },
    form: {
        width: '100%',
    },
    input: {
        backgroundColor: THEME.surface,
        borderWidth: 1,
        borderColor: THEME.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: THEME.text,
        marginBottom: 18,
    },
    loginBtn: {
        backgroundColor: THEME.primary,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        shadowColor: THEME.primary,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    loginBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    footerHint: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 12,
        color: THEME.textLight,
    },
});