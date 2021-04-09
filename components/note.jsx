import React,{useContext} from "react";
import { View, Text,  StyleSheet,TouchableOpacity } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import{LayoutContext} from "./LayoutContext"

const Note = ({ title, details,id, edit }) => {
const[singleLayout, setSingleLayout] = useContext(LayoutContext)

  const handleDelete =async(id)=>{
    try {
      var jsonNotes = await AsyncStorage.getItem("allnotes");
      var allNotes = JSON.parse(jsonNotes);
      let index = null;
      for (let i = 0; i < allNotes.length; i++) {
        if (allNotes[i].id === id) {
          index = i;
        }
      }
      allNotes.splice(index,1)
     await  AsyncStorage.setItem("allNotes",JSON.stringify(allNotes))
    }catch{
      alert("there is an error deleting that note")
    }

  }
  return (
    <>
    <TouchableOpacity style={singleLayout?styles.single:styles.double} onPress={()=>edit()}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>
        {details.length > 20 ? `${details.slice(0, 20)}...` : details}
      </Text>
      <TouchableOpacity style={styles.delete} onPress={()=>handleDelete(id)}>
        <MaterialIcons name="cancel" color="purple" size={16} />
      </TouchableOpacity>
    </TouchableOpacity>
    </>
  );
};

export default Note;

const styles = StyleSheet.create({
  double: {
    width: "40%",
    borderWidth: 1,
    borderColor: "purple",
    padding:4,
    borderRadius:4
  },
  single: {
    width: "100%",
    borderWidth: 1,
    borderColor: "purple",
    padding:4,
    borderRadius:4
  },
  title: {
    fontSize: "13",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: "12",
    fontWeight: "400",
  },
  
  delete: {
    
    zIndex: 6,
    position:"absolute",
    top:0,
    right:0
  },
});
