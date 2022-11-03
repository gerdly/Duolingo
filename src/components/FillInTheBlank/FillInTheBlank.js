import React, {useState} from "react";
import { View, Text } from "react-native";
import styles  from './styles'
import Button from "../Button";
import WordOption from "../WordOption";

const FillInTheBlank = ({question, onCorrect, onWrong}) =>{
    const [selected, setSelected] = useState(null);

    const onButtonPress= () =>{
        if (selected===question.correct) {
            onCorrect();
        }
        else{
            onWrong();
        }
        setSelected(null);
    };

    return (
        <>
            <Text style={styles.title}>Complete the sentence</Text>
            <View style={styles.row}>
                <Text style={styles.text}>{question.textPre}</Text>
                <View style={styles.blank}>
                    {selected && (
                    <WordOption  text = {selected} onPress={() => setSelected(null)} />
                    )}
                </View>
                <Text style={styles.text}>{question.textPost}</Text>
            </View>
            <View style={styles.optionsContainer}>
                {question.options.map((option) => (
                    <WordOption 
                        text = {option} 
                        isSelected={selected===option}
                        onPress={() => setSelected(option)}
                        />
                ))}       
            </View>
            <Button text="Check" onPress={onButtonPress} disabled={!selected} />
        </>
    );


};

export default FillInTheBlank;