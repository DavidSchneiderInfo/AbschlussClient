import {Text, View} from "@/components/Themed";
import {useSession} from "@/providers/session";
import {useRouter} from "expo-router";

export default function SignIn() {
    const router = useRouter();
    const { signIn } = useSession();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
                onPress={() => {
                    signIn('xxx');
                    router.replace('/');
                }}>
                Sign In
            </Text>
        </View>
    );
}