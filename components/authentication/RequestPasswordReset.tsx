import {Text, View} from "@/components/Themed";
import {useForm} from 'react-hook-form';
import {StyleSheet} from "react-native";
import Button from "@/components/Button";
import ControlledTextInput from "@/components/forms/ControlledTextInput";
import {requestPasswordReset} from "@/services/api/auth";
import {useState} from "react";

type FormData = {
    email: string
}

export default function RequestPasswordReset() {
    const { handleSubmit, watch, control, reset, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            email: '',
        }
    });
    const [response, setResponse] = useState<boolean|null>(null);

    const onSubmit = async data => {
        const result = await requestPasswordReset(data)
        setResponse(result);
    };

    return (
        <View style={styles.container}>

            <ControlledTextInput
                name='email'
                label='Email Address'
                control={control}
                rules={{
                    required: 'An email is required.',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email address.",
                    },
                }}
                error={errors.email}
            />

            {response == null ? (
                <View style={styles.button}>
                    <Button onPress={handleSubmit(onSubmit)} label='Request new password' />
                </View>
            ):(
                <Text>We have received your request. You will get an email with instructions to reset your password.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    },
    container: {
        width: '100%',
        padding: 50,
    },
});
