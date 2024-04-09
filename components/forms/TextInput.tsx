import {StyleSheet, TextInputProps as DefaultTextInputProps, TextInput as DefaultTextInput} from "react-native";
import {Text, useThemeColors, View} from "@/components/Themed";
import Typography from "@/constants/Typography";
import ValidationMessage from "@/components/forms/ValidationMessage";

export type TextInputProps = {
    label?: string,
    validationMessage?: string | null | undefined,
    containerStyles?: any
} & DefaultTextInputProps;

export default function TextInput({style, label, validationMessage, containerStyles, ...otherProps}: TextInputProps) {
    const colors = useThemeColors();

    const styles = StyleSheet.create({
        container: {
            marginBottom: 20,
        },
        input: {
            width: '100%',
            padding: 10,
            borderWidth: 1,
            borderRadius: Typography.borderRadius,
            color: colors.text,
            borderColor: colors.border,
            fontSize: Typography.fontSize,
        },
        label: {
            paddingBottom: 5,
        },
    });

    return (
        <View style={[styles.container,containerStyles]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <DefaultTextInput
                placeholderTextColor={colors.border}
                style={[
                    styles.input,
                    style,
                ]}
                {...otherProps}
            />
            {validationMessage && <ValidationMessage msg={validationMessage} /> }
        </View>
    );
}