import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShopStack } from './ShopStack';
import { CartScreen } from '@screens/CartScreen';
import { MeScreen } from '@screens/MeScreen';
import { THEME } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
    const insets = useSafeAreaInsets();
    const totalQty = useCartStore((state) => state.totalQuantity());

    const bottomInset = insets.bottom > 0 ? insets.bottom : 10;
    const tabHeight = 56 + bottomInset;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: THEME.primary,
                tabBarInactiveTintColor: THEME.textLight,
                tabBarIcon: () => null,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: tabHeight,
                    paddingBottom: bottomInset,
                    paddingTop: 8,
                    backgroundColor: THEME.surface,
                    borderTopWidth: 1,
                    borderTopColor: THEME.border,
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                    fontWeight: '700',
                },
            }}
        >
            <Tab.Screen
                name="ShopTab"
                component={ShopStack}
                options={{ tabBarLabel: 'Cửa hàng' }}
            />
            <Tab.Screen
                name="CartTab"
                component={CartScreen}
                options={{
                    tabBarLabel: 'Giỏ',
                    tabBarBadge: totalQty > 0 ? totalQty : undefined,
                    // ĐẨY HUY HIỆU SANG GÓC TRÊN BÊN PHẢI CỦA CHỮ "GIỎ"
                    tabBarBadgeStyle: {
                        backgroundColor: THEME.secondary,
                        color: '#FFFFFF',
                        fontSize: 11,
                        fontWeight: 'bold',
                        lineHeight: 14,
                        transform: [{ translateX: 34 }, { translateY: -4 }],
                    },
                }}
            />
            <Tab.Screen
                name="MeTab"
                component={MeScreen}
                options={{ tabBarLabel: 'Tôi' }}
            />
        </Tab.Navigator>
    );
};