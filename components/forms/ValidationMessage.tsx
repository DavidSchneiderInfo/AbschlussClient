import {StyleSheet} from "react-native";
import {Text} from "@/components/Themed";

type ValidationMessage = {
    msg: string,
}

export default function ValidationMessage({msg}: ValidationMessage) {
    const styles = StyleSheet.create({
        validationMessage: {
            paddingTop: 5,
        },
    });

    return <Text style={styles.validationMessage}>{msg}</Text>
}