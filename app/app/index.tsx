import { Text, View } from "react-native";

import { HelloWave,
 } from "../components/HelloWave";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HelloWave />
      <Text style={{ fontSize: 28, lineHeight: 32, marginTop: 6 }}>To Do</Text>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
