import {Controller, UseControllerProps} from "react-hook-form";
import TextInput, {TextInputProps} from "@/components/forms/TextInput";

interface ControlledTextInputProps extends TextInputProps, UseControllerProps {}

export default function ControlledTextInput({
    name,
    control,
    rules,
    error,
    onChangeText,
    value: initial,
    ...otherProps
}: ControlledTextInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput

                    onBlur={onBlur}
                    onChangeText={(changed)=> {
                        onChange(changed);
                        if(onChangeText)
                            onChangeText(changed);
                    }}
                    value={value ? value : initial}
                    validationMessage={error?.message}
                    {...otherProps}
                />
            )}
        />
    );
}