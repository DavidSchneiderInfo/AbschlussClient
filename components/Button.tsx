import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {PropsWithChildren} from "react";
import Typography from "@/constants/Typography";

type ButtonProps = {
    onPress: () => void,
    label?: string
} & PropsWithChildren

export default function Button({onPress, label, children}: ButtonProps) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        button: {
            backgroundColor: colors.primary,
            borderRadius: Typography.borderRadius,
            padding: 10,
            alignItems: 'center',
        },
        text: {
            color: colors.background,
            fontWeight: 'bold',
            fontSize: Typography.fontSize,
        },
    })
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                {label && <Text style={styles.text}>{label}</Text>}
                {children && (children)}
            </View>
        </TouchableOpacity>
    )
}