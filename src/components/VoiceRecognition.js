import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Voice from '@react-native-community/voice';

const VoiceRecognition = (props) => {
  const onSpeechStartHandler = (e) => {
    console.log('onSpeechStartHandler', e);
  };

  const onSpeechEndHandler = (e) => {
    console.log('onSpeechEndHandler', e);
  };

  const checkRecognize = () => {
    Voice.isRecognizing().then((result) => {
      console.log('isRecognizing', result);
      if (result === false) {
        console.log('reativar');
        Voice.start('pt-BR');
      }
    });
  };

  const onSpeechResultsHandler = (e) => {
    console.log('onSpeechResultsHandler', e.value[0]);
    checkRecognize();
  };

  const onSpeechRecognizedHandler = (e) => {
    console.log('onSpeechRecognizedHandler', e);
  };

  const onSpeechErrorHandler = (e) => {
    console.log('erro', e);
    Voice.stop().then(() => {
      checkRecognize();
    });
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechRecognized = onSpeechRecognizedHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    Voice.start('pt-BR');
    return async () => {
      Voice.removeAllListeners();
    };
  }, []);

  return (
    <View>
      <Text>Voice Test</Text>
    </View>
  );
};

export default VoiceRecognition;
