import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { Test } from "../testVariable";

export async function GetAllPages() {
  const [page, setPages] = useState([]);

  await axios
    .get(`http://${Test.ipConfig}:8080/getAllPages`)
    .then((response) => {
      setPages(response.data);
    })
    .catch((error) => {
      Alert.alert("Error@index.ts.GetAllPages:", error);
      console.log("Error@index.ts.GetAllPages: ", error);
    });
}