import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import Note from "./Note";
import { Entypo } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LayoutContext } from "./LayoutContext";

const Notes = ({ navigation }) => {
  const getNotes = async () => {
    try {
      var jsonNotes = await AsyncStorage.getItem("allnotes");
      var allNotes = JSON.parse(jsonNotes);
      setNotes(allNotes);
    } catch {
      setNotes(null);
    }
  };

  const editNote = (note) => {
    navigation.navigate("EditNote", note);
  };
  useEffect(() => {
    getNotes();
  }, [navigation]);

  const [notes, setNotes] = useState();

  const [results, setResults] = useState(notes);

  const [searchParam, setSearchParam] = useState("");
  const [pinned, setPinned] = useState(true);
  const [singleLayout, setSingleLayout] = useContext(LayoutContext);

  const search = () => {
    if (notes != null) {
      let notesCopy = notes.slice;
      let result = notesCopy.filter((note) => {
        return (
          (note.title.lowerCase() === searchParam.lowerCase ||
            note.details.lowerCase() === searchParam.lowerCase) &&
          note.pinned == pinned
        );
      });
      setResults(result);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="purple" />

      <View style={styles.header}>
        <Text style={styles.headerText}>Notes</Text>
      </View>
      <TouchableOpacity style={styles.layout} onPress={() => setSingleLayout(!singleLayout)}>
        <Text style={styles.layoutText}>Switch Layout</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="search"
        value={searchParam}
        onChangeText={(searchParam) => {
          setSearchParam(searchParam);
          search();
        }}
        defaultValue={searchParam}
      />
      <View style={styles.pinned}>
        <TouchableOpacity
          style={pinned ? styles.on : styles.off}
          onPress={() => {
            setPinned(true);
            search();
          }}
        >
          <Text style={pinned ? styles.pintxton : styles.pintxtoff}>
            Pinned
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={pinned ? styles.off : styles.on}
          onPress={() => {
            setPinned(false);
            search();
          }}
        >
          <Text style={pinned ? styles.pintxtoff : styles.pintxton}>Other</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
      >
        {notes ? (
          results.map((note, index) => (
            <Note
              title={note.title}
              details={note.details}
              id={note.id}
              edit={() => editNote({ ...note, index: index })}
            />
          ))
        ) : (
          <View style={styles.noNotes}>
            <Text>
              You Currently do not have any notes stored,tap the feather icon to
              add one
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.add}
          onPress={() => {
            navigation.navigate("EditNote", "new");
          }}
        >
          <Entypo name="feather" size={22} color="#FFF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notes;
const styles = StyleSheet.create({
  input: {
    width: "80%",
    padding: 10,
    margin: 20,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "purple",
    borderRadius: 6,
  },
  scroll: {
    //  flex:1,
  },
  header: {
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
  },
  add: {
    backgroundColor: "purple",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,

    elevation: 5,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    flex: 1,
  },
  container: {
    flex: 1,
  },
  noNotes: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pinned: {
    width: "60%",
    alignSelf: "center",
    borderRadius: 2,
    marginVertical: 10,
    flexDirection: "row",
  },
  on: {
    padding: 10,
    backgroundColor: "purple",
    width: "50%",
    borderRadius: 2,
    justifyContent:"center",
    alignItems:"center"
  },
  off: {
    backgroundColor: "#FFF",
    padding: 10,
    width: "50%",
    borderRadius: 2,
    justifyContent:"center",
    alignItems:"center"
  },
  pintxtoff: {
    color: "purple",
    fontSize: 12,
    fontWeight: 400,
  },
  pintxton: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: 400,
  },
  noNotes:{
    justifyContent:"center",
    alignItems:"center",
    flex:1
  },
  layout:{
    backgroundColor:"purple",
    alignSelf:"flex-end",
    borderRadius:4,
    padding:8,
    marginVertical:7,
    marginRight:7

  },
  layoutText:{
    color:"white"
  }
});
