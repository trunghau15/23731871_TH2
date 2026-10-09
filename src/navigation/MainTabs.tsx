import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStack } from './ShopStack';
import { CartScreen } from '@screens/CartScreen';
import { MeScreen } from '@screens/MeScreen';
import { THEME } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
    const totalQty = useCartStore((state) => state.totalQuantity());

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: THEME.primary,
                tabBarInactiveTintColor: THEME.textLight,
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