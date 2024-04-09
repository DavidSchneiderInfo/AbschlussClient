import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useState} from "react";
import {StyleSheet, ViewStyle} from "react-native";
import {useThemeColors, View} from "@/components/Themed";
import Typography from "@/constants/Typography";
import ValidationMessage from "@/components/forms/ValidationMessage";

export type CheckboxProps = {
    label: string,
    initial: boolean | undefined,
    onChange: (checked: boolean) => void,
    containerStyle?: ViewStyle
    validationMessage?: string | null | undefined,
}

export default function Checkbox({initial, label, onChange, value, containerStyle, validationMessage}: CheckboxProps) {
    const [checked, setChecked] = useState<boolean|undefined>(initial);
    const colors = useThemeColors();

    const styles = StyleSheet.create({
        container: {
            paddingVertical: 10,
        },
        checkbox: {
            textDecorationLine: "none",
            fontSize: Typography.fontSize,
        },
    })

    return(
        <View style={[
            styles.container,
            containerStyle
        ]}>
            <BouncyCheckbox
                isChecked={(typeof(value) != "undefined") ? checked : value}
                fillColor={colors.primary}
                textStyle={styles.checkbox}
                text={label}
                onPress={(isChecked: boolean) => {
                    setChecked(isChecked);
                    onChange(isChecked);
                }}
            />
            {validationMessage && <ValidationMessage msg={validationMessage} /> }
        </View>
    );
}