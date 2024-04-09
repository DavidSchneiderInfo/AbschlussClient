import {View} from "@/components/Themed";
import {useForm} from 'react-hook-form';
import {StyleSheet} from "react-native";
import Button from "@/components/Button";
import ControlledTextInput from "@/components/forms/ControlledTextInput";
import {requestLogin} from "@/services/api/auth";
import {useSession} from "@/components/providers/session";
import {useRouter} from "expo-router";

type FormData = {
    email: string
    password: string
}

export default function LoginForm() {
    const { handleSubmit, watch, control, reset, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        }
    });
    const { signIn } =useSession();
    const router = useRouter();

    const onSubmit = async data => {
        const token = await requestLogin(data);
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

            <View style={styles.button}>
                <Button onPress={handleSubmit(onSubmit)} label='Login' />
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
