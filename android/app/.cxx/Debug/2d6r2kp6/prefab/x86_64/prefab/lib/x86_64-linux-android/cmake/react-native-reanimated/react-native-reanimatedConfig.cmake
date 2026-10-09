if(NOT TARGET react-native-reanimated::reanimated)
add_library(react-native-reanimated::reanimated SHARED IMPORTED)
set_target_properties(react-native-reanimated::reanimated PROPERTIES
    IMPORTED_LOCATION "C:/Users/ADMIN/KTXGo_23731871/node_modules/react-native-reanimated/android/build/intermediates/cxx/Debug/2x2b12r2/obj/x86_64/libreanimated.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/ADMIN/KTXGo_23731871/node_modules/react-native-reanimated/android/build/prefab-headers/reanimated"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

