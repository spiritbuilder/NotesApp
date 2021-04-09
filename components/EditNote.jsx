import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";


const EditNote = ({ navigation, route }) => {
  const [formdata, setFormData] = useState({
    title: "",
    details: "",
    id: new Date(),
  });
  const [newNote, setNewNote] = useState(true);

  useEffect(() => {
    route.params ? setNewNote(false) : setNewNote(true);
    route.params? setFormData(route.params):null
      
    
    
  }, [navigation]);

  const handleSave = async (type) => {
    try {
      var jsonNotes = await AsyncStorage.getItem("allNotes");
      
      if(jsonNotes!=null){
        var allNotes = JSON.parse(jsonNotes);
      if (newNote) {
        let addNote = { ...formdata, pinned: type };
        allNotes.push(addNote);
        await AsyncStorage.setItem("allNotes", JSON.stringify(allNotes) );
        navigation.navigate("Notes")
      } else {
        let index = null;
        for (let i = 0; i < allNotes.length; i++) {
          if (allNotes[i].id === formdata.id) {
            index = i;
          }
        }
        let replaceNote = { ...formdata, pinned: type };
        allNotes[index] = replaceNote;
        await AsyncStorage.setItem("allNotes", JSON.stringify(allNotes))
        navigation.navigate("Notes")
      }
      }
      else{
        
          let addNote = [{ ...formdata, pinned: type }];
          
          await AsyncStorage.setItem("allNotes", JSON.stringify(addNote) );
          navigation.navigate("Notes")
        
      }
    } catch (e) {
      
      alert(e);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="purple" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" color="#FFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Note</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="give your note a title"
            value={formdata.title}
            onChangeText={(title) => setFormData({ ...formdata, title: title })}
            defaultValue={formdata.title}
          />
        </View>
        <View>
          <Text style={styles.label}>Content</Text>
          <TextInput
            multiline
            style={styles.multiline}
            placeholder="write your notes here"
            value={formdata.details}
            onChangeText={(details) =>
              setFormData({ ...formdata, details: details })
            }
            defaultValue={formdata.details}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSave(true)}
          >
            <Text style={styles.btntext}>Save as Pinned</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSave(false)}
          >
            <Text style={styles.btntext}>Save as Other</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditNote;
const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 4,
    padding: 10,
  },
  multiline: {
    width: "100%",
    borderWidth: 1,
    borderColor: "purple",

    borderRadius: 4,
    height: 100,
    padding: 10,
  },
  scroll: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    backgroundColor: "purple",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    width: "100%",
  },
  button: {
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
  },
  btntext: {
    color: "white",
  },
  container: {
    flex: 1,
  },
  label: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  back: {
    marginRight: 80,
  },
});
