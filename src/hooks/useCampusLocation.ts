import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { BASE_SHIP_FEE, VARIANT } from '@constants/student';
import { useCartStore } from '@stores/cartStore';

const KTX_COORDS = { latitude: 10.8221, longitude: 106.6868 };

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export type PermissionStatus = 'idle' | 'granted' | 'denied' | 'blocked';

export function useCampusLocation() {
    const [status, setStatus] = useState<PermissionStatus>('idle');
    const [distanceKm, setDistanceKm] = useState<number | null>(null);
    const [shippingFee, setShippingFee] = useState<number | null>(null);

    const calculateFee = (km: number) => {
        if (VARIANT.shipFormula === 'A') {
            return BASE_SHIP_FEE + Math.round(km * 2000);
        }
        // Công thức B cho số cuối 1 của bạn
        return BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
    };

    const requestLocation = async () => {
        if (Platform.OS === 'android') {
            try {
                const check = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (check) {
                    setStatus('granted');
                    fetchCoords();
                    return;
                }

                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setStatus('granted');
                    fetchCoords();
                } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
                    setStatus('denied');
                } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                    setStatus('blocked');
                }
            } catch {
                setStatus('denied');
            }
        } else {
            setStatus('granted');
            fetchCoords();
        }
    };

    const fetchCoords = () => {
        // 1. Gán ngay phí mock 1.2km (12.800 đ) vào Store để cập nhật tức thì
        const mockKm = 1.2;
        const initialFee = calculateFee(mockKm);
        setDistanceKm(mockKm);
        setShippingFee(initialFee);
        useCartStore.getState().setShippingFee(initialFee);

        // 2. Lấy tọa độ thực tế nếu thiết bị hỗ trợ
        Geolocation.getCurrentPosition(
            (pos) => {
                const km = haversineDistance(
                    pos.coords.latitude,
                    pos.coords.longitude,
                    KTX_COORDS.latitude,
                    KTX_COORDS.longitude
                );
                const fixedKm = parseFloat(km.toFixed(1));
                const fee = calculateFee(fixedKm);
                setDistanceKm(fixedKm);
                setShippingFee(fee);
                useCartStore.getState().setShippingFee(fee);
            },
            () => {
                // Giữ nguyên kết quả mock 1.2km nếu máy ảo không có GPS
            },
            { enableHighAccuracy: false, timeout: 4000 }
        );
    };

    return { status, distanceKm, shippingFee, requestLocation };
}