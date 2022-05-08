import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { captureScreen } from 'react-native-view-shot';

import { FeedbackType } from '../Widget';
import { Screenshot } from '../Screenshot';
import { Button } from '../Button';
import { theme } from '../../theme';
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { api } from '../../libs/api';
import * as FileSystem from 'expo-file-system'


interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
};

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {

    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState("");

    const feedbackTypeInfo = feedbackTypes[feedbackType];


    function handleScreenShot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
            .then(uri => setScreenshot(uri))
            .catch(err => console.log(err))
    };

    function handleScreenshotRemove() {
        setScreenshot(null)
    };

    async function handleSendFeedback() {
        if (isSendingFeedback) {
            return;
        };

        setIsSendingFeedback(true);
        const screenShotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

        try {
            await api.post("/feedbacks", {
                type: feedbackType,
                screenshot: `data?image/png;base64, ${screenShotBase64}`,
                comment
            });

            onFeedbackSent();
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>

                    <Image
                        style={styles.image}
                        source={feedbackTypeInfo.image}
                    />

                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>

                </View>
            </View>


            <TextInput
                onChangeText={setComment}
                multiline
                style={styles.input}
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
            />

            <View
                style={styles.footer}
            >
                <Screenshot
                    onTakeShot={handleScreenShot}
                    onRemoveSHot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
                <Button
                    onPress={handleSendFeedback}
                    isLoading={isSendingFeedback}
                />
            </View>

        </View>
    );
}