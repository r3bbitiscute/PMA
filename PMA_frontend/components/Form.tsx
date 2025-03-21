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
import { router, useFocusEffect } from "expo-router";

/**
 * Configuration for form fields, the key is the field name
 * while the value(type) will store the data type of the input field to be created
 */
interface FieldConfig {
  [key: string]: { type: string | number | boolean | Date };
}

/**
 * Configuration for data fields, the key is the field name
 * while the value will store the following data type
 */
interface DataConfig {
  [key: string]: string | number | boolean | Date;
}

/**
 * Props for the Form component.
 * @property {string} collection - The collection name for the form.
 * @property {string} [pageName] - Optional page name to include in the form data.
 * @property {string} [listName] - Optional list name to include in the form data.
 * @property {boolean} [edit] - Optional flag to indicate if the form is in edit mode.
 */
interface Props {
  collection: string;
  pageName?: string;
  listName?: string;
  cardName?: string;
  edit?: boolean;
}

export default function Form({
  collection,
  pageName,
  listName,
  cardName,
  edit,
}: Props) {
  const [schema, setSchema] = useState<FieldConfig>({});
  const [formData, setFormData] = useState<DataConfig>({});
  const [datePickerFlag, setDatePickerFlag] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Fetch form configuration from the server
      axios
        .get(`http://${Test.ipConfig}:8080/getFormConfig/${collection}`)
        .then((response) => {
          setSchema(response.data);
        })
        .catch((error) => {
          Alert.alert("Error@Form.tsx.useFocusEffect:", error);
          console.log("Error@Form.tsx.useFocusEffect:", error);
        });

      // Check if user is editing or creating new data
      if (edit) {
        if (cardName) {
          // Fetch card data for editing
          axios
            .get(
              `http://${Test.ipConfig}:8080/getCard/${pageName}/${listName}/${cardName}`
            )
            .then((response) => {
              setFormData(response.data);
            })
            .catch((error) => {
              Alert.alert("Error@Form.tsx.useFocusEffect:", error);
              console.log("Error@Form.tsx.useFocusEffect:", error);
            });
        } else if (listName) {
          // Fetch list data if editing a list
          axios
            .get(`http://${Test.ipConfig}:8080/getList/${pageName}/${listName}`)
            .then((response) => {
              setFormData(response.data);
            })
            .catch((error) => {
              Alert.alert("Error@Form.tsx.useFocusEffect:", error);
              console.log("Error@Form.tsx.useFocusEffect:", error);
            });
        } else {
          // Fetch list data if editing a list
          axios
            .get(`http://${Test.ipConfig}:8080/getPage/${pageName}`)
            .then((response) => {
              setFormData(response.data);
            })
            .catch((error) => {
              Alert.alert("Error@Form.tsx.useFocusEffect:", error);
              console.log("Error@Form.tsx.useFocusEffect:", error);
            });
        }
      }

      // Add page name to form data if provided
      if (pageName) {
        setFormData((prevData) => ({
          ...prevData,
          page: pageName,
        }));
      }

      // Add list name to form data if provided
      if (listName) {
        setFormData((prevData) => ({
          ...prevData,
          list: listName,
        }));
      }
    }, [])
  );

  // Toggle date picker visibility
  const ToggleDatePicker = () => {
    setDatePickerFlag((prevFlag) => !prevFlag);
  };

  // Handle input field changes
  const HandleInputChange = (
    field: string,
    value: string | number | boolean | Date
  ) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Submit form data to the server
  const HandleSubmit = () => {
    if (edit) {
      if (cardName) {
        axios
          .put(
            `http://${Test.ipConfig}:8080/editCard/${pageName}/${listName}/${cardName}`,
            formData
          )
          .then((response) => {
            Alert.alert(response.data);
            router.back();
          })
          .catch((error) => {
            Alert.alert(error);
            console.log("error@Form.tsx.handleSubmit: ", error);
          });
      } else {
        axios
          .put(`http://${Test.ipConfig}:8080/editPage/${pageName}`, formData)
          .then((response) => {
            Alert.alert(response.data);
            router.back();
          })
          .catch((error) => {
            Alert.alert(error);
            console.log("error@Form.tsx.handleSubmit: ", error);
          });
      }
    } else {
      axios
        .post(`http://${Test.ipConfig}:8080/submitData/${collection}`, formData)
        .then((response) => {
          Alert.alert(response.data);
          router.back();
        })
        .catch((error) => {
          Alert.alert(error);
          console.log("error@Form.tsx.handleSubmit: ", error);
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputFieldContainer}>
        {/* Render input fields based on the form schema */}
        {Object.keys(schema).map((field) => {
          if (schema[field].type === "String") {
            return (
              <TextInput
                key={field}
                placeholder={`Enter ${field}`}
                style={styles.textField}
                onChangeText={(text) => HandleInputChange(field, text)}
                value={formData[field] ? (formData[field] as string) : ""}
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

      {/* Submit button */}
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
