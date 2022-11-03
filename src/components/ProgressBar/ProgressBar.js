import { View, StyleSheet } from 'react-native'
import React from 'react'

const ProgressBar = ({progress}) => {
  return (
    <View style={styles.bg}>
      <View style={[styles.fg, {width: `${progress * 100}%`}]}>
        <View style={styles.highlight} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  bg: {
    backgroundColor: "lightgray",
    height: 20,
    borderRadius: 15,
    flex: 1,

  },

  fg:{
    flex: 1,
    backgroundColor: '#FAC800',
    borderRadius: 15,
   

  },
  highlight:{
    backgroundColor: '#FAD131',
    width:"90%",
    height: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'center',

  },

});
export default ProgressBar