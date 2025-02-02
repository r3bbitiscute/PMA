import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Colors } from "../theme/GlobalStyle";
import { Test } from "../testVariable";

interface FieldConfig {
  [key: string]: { type: string | number | boolean };
}

interface DataConfig {
  [key: string]: string | number | boolean;
}

interface Props {
  collection: string;
}

export default function Form({ collection }: Props) {
  const [schema, setSchema] = useState<FieldConfig>({});
  const [formData, setFormData] = useState<DataConfig>({});

  useEffect(() => {
    axios
      .get(`http://${Test.ipConfig}:8080/getFormConfig/${collection}`)
      .then((response) => {
        setSchema(response.data);
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }, []);

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = () => {
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
      {Object.keys(schema).map((field) => {
        if (schema[field].type === "String") {
          return (
            <TextInput
              key={field}
              placeholder={`Enter ${field}`}
              style={styles.textField}
              onChangeText={(text) => handleInputChange(field, text)}
            />
          );
        }
      })}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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

  textField: {
    width: "100%",
    backgroundColor: Colors.textPrimary,
    borderRadius: 5,
    marginBottom: 10,
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
