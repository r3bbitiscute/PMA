import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Colors } from "../theme/GlobalStyle";
import { Test } from "../testVariable";
import { useFocusEffect } from "expo-router";

interface FieldConfig {
  [key: string]: { type: string | number | boolean | Date };
}

interface DataConfig {
  [key: string]: string | number | boolean | Date;
}

interface Props {
  collection: string;
  pageName?: string;
  listName?: string;
}

export default function Form({ collection, pageName, listName }: Props) {
  const [schema, setSchema] = useState<FieldConfig>({});
  const [formData, setFormData] = useState<DataConfig>({});
  const [datePickerFlag, setDatePickerFlag] = useState(false);

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`http://${Test.ipConfig}:8080/getFormConfig/${collection}`)
        .then((response) => {
          setSchema(response.data);
        })
        .catch((error) => {
          Alert.alert("Error@Form.tsx.useFocusEffect:", error);
          console.log("Error@Form.tsx.useFocusEffect:", error);
        });

      if (pageName) {
        setFormData((prevData) => ({
          ...prevData,
          page: pageName,
        }));
      }

      if (listName) {
        setFormData((prevData) => ({
          ...prevData,
          list: listName,
        }));
      }
    }, [])
  );

  const ToggleDatePicker = () => {
    setDatePickerFlag((prevFlag) => !prevFlag);
  };

  const HandleInputChange = (
    field: string,
    value: string | number | boolean | Date
  ) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const HandleSubmit = () => {
    axios
      .post(`http://${Test.ipConfig}:8080/submitData/${collection}`, formData)
      .then((response) => {
        Alert.alert(response.data);
      })
      .catch((error) => {
        Alert.alert(error);
        console.log("error@Form.tsx.handleSubmit: ", error);
      });
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputFieldContainer}>
        {Object.keys(schema).map((field) => {
          if (schema[field].type === "String") {
            return (
              <TextInput
                key={field}
                placeholder={`Enter ${field}`}
                style={styles.textField}
                onChangeText={(text) => HandleInputChange(field, text)}
              />
            );
          } else if (schema[field].type === "Date") {
            return (
              <View key={field} style={styles.button}>
                <TouchableOpacity onPress={ToggleDatePicker}>
                  <Text>
                    {formData[field]
                      ? new Date(formData[field] as Date).toLocaleDateString()
                      : "Select Date"}
                  </Text>
                </TouchableOpacity>
                {datePickerFlag && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      setDatePickerFlag(false);
                      if (selectedDate) {
                        HandleInputChange(field, selectedDate.toISOString());
                      }
                    }}
                  />
                )}
              </View>
            );
          }
        })}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={HandleSubmit}>
        <Text style={styles.submitButtonLabel}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },

  inputFieldContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  textField: {
    width: "100%",
    backgroundColor: Colors.textPrimary,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },

  button: {
    height: 40,
    width: "100%",
    backgroundColor: Colors.textPrimary,
    borderRadius: 5,
    padding: 10,
  },

  submitButton: {
    height: 40,
    width: "100%",
    backgroundColor: Colors.accent,
    borderRadius: 5,
    padding: 10,
  },

  submitButtonLabel: {
    color: Colors.textPrimary,
    textAlign: "center",
  },
});
