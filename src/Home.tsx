import { StatusBar } from "expo-status-bar";
import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={false} />
      <ScrollView>
        {Array.from({ length: 50 }, (_, k) => k).map((i) => (
          <Text
            key={i}
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              backgroundColor: "#cccccc",
            }}
          >
            message {i}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        placeholder="send a message"
        style={{ borderWidth: 1, width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
