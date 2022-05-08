import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props {
    screenshot: string | null;
    onTakeShot: () => void;
    onRemoveSHot: () => void;
}

export function Screenshot({ screenshot, onRemoveSHot, onTakeShot }: Props) {
    return (
        <TouchableOpacity
            onPress={screenshot ? onRemoveSHot : onTakeShot}
            style={styles.container}
        >
            {
                screenshot ?
                    <View>
                        <Image
                            style={styles.image}
                            source={{ uri: screenshot }}
                        />

                        <Trash
                            size={22}
                            color={theme.colors.text_secondary}
                            weight="fill"
                            style={styles.removeIcon}
                        />

                    </View>
                    :
                    <Camera
                        size={22}
                        color={theme.colors.text_secondary}
                        weight="fill"
                    />
            }
        </TouchableOpacity>
    );
}