
import {  Text, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'

const WordOption = ({text, onPress, isSelected}) => {
  return (
    <Pressable 
        onPress={onPress} 
        style={[
            styles.root,
            {backgroundColor: isSelected ? "gray" : "white"},
            ]}
    >
      <Text 
        style={[
          styles.text,{color : isSelected ? "gray" : "black"}
          ]}> 
        {text} 
      </Text>
    </Pressable>
  );
};

export default WordOption