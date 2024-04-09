import {Text, View} from "@/components/Themed";
import {useSession} from "@/components/providers/session";
import {useRouter} from "expo-router";
import {useState} from "react";
import RequestPasswordReset from "@/components/authentication/RequestPasswordReset";
import RegisterForm from "@/components/authentication/RegisterForm";
import LoginForm from "@/components/authentication/LoginForm";
import Header from "@/components/authentication/Header";

enum SignInMode {
    Login,
    Register,
    RequestNewPassword,
}

export default function SignIn() {
    const router = useRouter();
    const { signIn } = useSession();
    const [mode, setMode] = useState(SignInMode.Login);

    function getForm() {
        switch (mode) {
            case SignInMode.Login:
                return <LoginForm />
            case SignInMode.Register:
                return <RegisterForm />
            case SignInMode.RequestNewPassword:
                return <RequestPasswordReset />
        }
    }

    function getFooterLink(label: string, mode: SignInMode) {
        return <Text onPress={()=>setMode(mode)}>{label}</Text>
    }

    function getFooter() {
        switch (mode) {
            case SignInMode.Login:
                return <>
                    {getFooterLink('Sign up', SignInMode.Register)}
                    {getFooterLink('Request new password', SignInMode.RequestNewPassword)}
                </>
            case SignInMode.Register:
            case SignInMode.RequestNewPassword:
                return getFooterLink('Login', SignInMode.Login);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Header />
            {getForm()}
            {getFooter()}
        </View>
    );
}