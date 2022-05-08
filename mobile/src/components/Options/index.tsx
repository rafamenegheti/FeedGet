import React from 'react';
import { Text, View } from 'react-native';
import { Compyright } from '../Compyright';
import { Option } from '../Option';
import { feedbackTypes } from '../../utils/feedbackTypes'

import { styles } from './styles';
import { FeedbackType } from '../Widget';


interface Props {
  onFeedbackTypeChenged: (feedbackType: FeedbackType) => void;
};

export function Options({ onFeedbackTypeChenged }: Props) {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>
        Deixe seu feedback
      </Text>

      <View style={styles.options}>
        {
          Object.entries(feedbackTypes)
            .map(([key, value]) => {
              return (
                <Option
                  key={key}
                  title={value.title}
                  image={value.image}
                  onPress={() => onFeedbackTypeChenged(key as FeedbackType)}
                />
              )
            })
        }
      </View>

      <Compyright />
    </View>
  );
}