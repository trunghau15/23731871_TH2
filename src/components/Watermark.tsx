import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STUDENT, examStamp } from '@constants/student';
import { THEME } from '@constants/theme';

export const Watermark = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DBEAFE',
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: THEME.border,
    },
    text: {
        fontSize: 11,
        fontWeight: '700',
        color: THEME.text,
    },
});