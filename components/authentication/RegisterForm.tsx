import {View} from "@/components/Themed";
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet} from "react-native";
import Button from "@/components/Button";
import ControlledTextInput from "@/components/forms/ControlledTextInput";
import Checkbox from "@/components/forms/Checkbox";
import ControlledCheckbox from "@/components/forms/ControlledCheckbox";
import {requestSignUp} from "@/services/api/auth";
import {useSession} from "@/components/providers/session";
import {useRouter} from "expo-router";

type FormData = {
    email: string
    password: string
    confirm_password: string
    terms: boolean
}

export default function RegisterForm() {
    const { handleSubmit, watch, control, reset, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            confirm_password: '',
            terms: false,
        }
    });
    const {signIn} = useSession();
    const router = useRouter();

    const onSubmit = async data => {
        const token = await requestSignUp({
            email: data.email,
            password: data.password,
        })
        signIn(token);
        router.replace('/');
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

            <ControlledTextInput
                name='password'
                label='Password'
                control={control}
                rules={{ required: 'A password is required.' }}
                secureTextEntry={true}
                error={errors.password}
            />

            <ControlledTextInput
                name='confirm_password'
                label='Password Confirmation'
                control={control}
                rules={{
                    required: 'A password is required.',
                    validate: (val: string) => {
                        if (watch("password") != val) {
                            return "Your passwords do no match";
                        }
                    },
                }}
                secureTextEntry={true}
                error={errors.confirm_password}
            />

            <ControlledCheckbox
                name='terms'
                label='Terms of Service'
                control={control}
                rules={{
                    required: 'You have to accept the terms of service.',
                    validate: (val: string) => {
                        if (val != true) {
                            return 'You have to accept the terms of service.';
                        }
                    },
                }}
                initial={false}
            />

            <View style={styles.button}>
                <Button onPress={handleSubmit(onSubmit)} label='Sign up' />
            </View>
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
