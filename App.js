import { StatusBar } from 'expo-status-bar';
import {  ActivityIndicator, Alert, SafeAreaView, } from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './App.styles';
import Header from './src/components/Header';


//import questions from "./assets/data/imageMulatipleChoiceQuestions"
//import questions from "./assets/data/openEndedQuestions"
import questions from "./assets/data/allQuestions"

import ImageMultipleChoiceQuestion from './src/components/ImageMultipleChoiceQuestion';
import OpenEndedQuestion from './src/components/OpenEndedQuestion/OpenEndedQuestion';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import FillInTheBlank from './src/components/FillInTheBlank';


export default function App() {

  //const origin =[1, 2 ,8]
  //cons doubled = origin.map((value)) = .  value * 2)
  //console.log(doubled)

 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[currentQuestionIndex]);
  const [lives, setlives] = useState(5);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect( ()=>{
    if(currentQuestionIndex >= questions.length){
      setCurrentQuestionIndex(0);
      Alert.alert("YOU WON, Great Job!");
    }
    else{
    setCurrentQuestion(questions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex]);


  useEffect(()=>{
    loadData();

  },[]) //with the empty array only works the first time when the component mounts
  
  useEffect(()=>{
    if(hasLoaded){
      saveData();

    }
    
  },[lives, currentQuestionIndex, hasLoaded]) //with the empty array only works the first time when the component mounts
  
  const onCorrect = () =>{
   // Alert.alert("Correct");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const restart =() =>{
    setlives(5);
    setCurrentQuestionIndex(0);

  }
  const onWrong = () => {
    
    if (lives <= 1)
    {
      Alert.alert("Game Over", "Try Again", [
        {
          text: "Try Again",
          onPress: restart,

        }
      ]);
      setlives(lives -1);
    }
    else{
      Alert.alert("Wrong, Try Again");
      setlives(lives -1);
    }
    
  }

  const saveData = async() =>{

    await AsyncStorage.setItem('lives', lives.toString()); //pair key, value
    await AsyncStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());

  }

  const loadData = async () =>{
    const loadedLives = await AsyncStorage.getItem('lives'); 
    if(loadedLives){
      setlives(parseInt(loadedLives));

    }
    const currentQuestionIndex =  await AsyncStorage.getItem('currentQuestionIndex');
    if(currentQuestionIndex){
      setCurrentQuestionIndex(parseInt(currentQuestionIndex));
     //setCurrentQuestionIndex(0);
    }

    setHasLoaded(true);
  }

  if(!hasLoaded){
    return (<ActivityIndicator />);
  }
  return (
  <SafeAreaView style={styles.root}>
      <Header progress={currentQuestionIndex / questions.length} lives={lives} />
      {currentQuestion.type === "FILL_IN_THE_BLANK" && (
        <FillInTheBlank
          question={currentQuestion}
          onCorrect={onCorrect}
          onWrong={onWrong}
        />
      )}
      {currentQuestion.type === "IMAGE_MULTIPLE_CHOICE" && (
        <ImageMultipleChoiceQuestion
          question={currentQuestion}
          onCorrect={onCorrect}
          onWrong={onWrong}
        />
      )}
      {currentQuestion.type === "OPEN_ENDED" && (
        <OpenEndedQuestion
          question={currentQuestion}
          onCorrect={onCorrect}
          onWrong={onWrong}
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

