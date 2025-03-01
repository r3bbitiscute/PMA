import { useCallback, useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Alert } from "react-native";
import {
  useLocalSearchParams,
  useNavigation,
  router,
  useFocusEffect,
} from "expo-router";
import axios from "axios";

import List from "../components/List";
import CircleButton from "../components/CircleButton";
import { Colors } from "../theme/GlobalStyle";
import { Test } from "../testVariable";

interface ListType {
  name: string;
  page: string;
}

/**
 * This will be the template for a "Page"
 * @returns "Page" Template
 */
export default function PageTemplate() {
  const { pageName } = useLocalSearchParams();
  const navigation = useNavigation();

  const [lists, setLists] = useState<ListType[]>([]);

  // Getting data ("List" & "Card") from MongoDB server
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ title: `${pageName}` });

      axios
        .get(`http://${Test.ipConfig}:8080/getLists/${pageName}`)
        .then((response) => {
          setLists(response.data);
        })
        .catch((error) => {
          Alert.alert("Error@PageTemplate.tsx.useFocusEffect:", error);
          console.log("Error@PageTemplate.tsx.useFocusEffect:", error);
        });
    }, [])
  );

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.background}>
      <View style={styles.listContainer}>
        {/* Making sure that all the "List" will be in a horizontal scroll view to allow user to swipe left and right*/}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          snapToAlignment="start"
          snapToInterval={screenWidth}
          decelerationRate="fast"
        >
          {/* Looping through each "List" retrieved and creating a "List" component for it */}
          {lists.map((list, index) => (
            <List
              key={index}
              title={list.name}
              page={pageName as string}
              list={list.name}
              screenWidth={screenWidth}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        {/* Create "List" Button */}
        <CircleButton
          buttonSize={55}
          icon="add"
          OnPress={() =>
            router.push({
              pathname: "/CreateList",
              params: { pageName: pageName },
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  listContainer: {
    flex: 1,
    alignItems: "center",
  },

  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
