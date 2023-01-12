import { useEffect, useRef } from "react";
import {
  Animated,
  Keyboard,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabBar({ state, descriptors, navigation }) {
  const barHeightScale = useRef(new Animated.Value(1)).current;
  const insets = useSafeAreaInsets();
  const outputRange = 56 + insets.bottom;

  useEffect(() => {
    if ("android" === Platform.OS) {
      const keyboardDidShow = Keyboard.addListener(
        "keyboardDidShow",
        function () {
          return barHeightScale.setValue(0);
        }
      );
      const keyboardDidHide = Keyboard.addListener(
        "keyboardDidHide",
        function () {
          return barHeightScale.setValue(1);
        }
      );
      return () => {
        keyboardDidShow.remove();
        keyboardDidHide.remove();
      };
    }
  }, []);

  return (
    <Animated.View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        height: barHeightScale.interpolate({
          inputRange: [0, 1],
          outputRange: [0, outputRange],
        }),
        opacity: barHeightScale,
        marginTop: -4,
        paddingBottom: Math.max(insets.bottom - 10, 0),
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center" }}
            key={route.name}
          >
            <Text style={{ color: isFocused ? "#673ab7" : "white" }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}
