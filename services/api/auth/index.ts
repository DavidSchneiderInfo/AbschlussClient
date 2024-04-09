type LoginProps = {
    email: string
    password: string
}

export async function requestLogin(props: LoginProps) {
    return 'xxx';
}

type SignUpProps = {
    email: string
    password: string
}

export async function requestSignUp(props: SignUpProps) {
    return 'xxx';
}

type PasswordResetProps = {
    email: string
}

export async function requestPasswordReset(props: PasswordResetProps) {
    return true;
}