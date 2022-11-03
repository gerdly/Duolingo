import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    optionsContainer: {
  
        width: "100%",
        flexDirection: "row",
        flex: 1,
        flexWrap: "wrap", //lets childgo to a new line when dont fit 
        justifyContent: "space-between",
        alignContent: "space-between",
        
      },
      
      title:{
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "stretch",
        
      },
   

  });
  
  export default styles;