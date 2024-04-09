import {Controller, UseControllerProps} from "react-hook-form";
import Checkbox, {CheckboxProps} from "@/components/forms/Checkbox";

interface ControlledCheckboxProps extends CheckboxProps, UseControllerProps {}

export default function ControlledCheckbox({
    name,
    control,
    rules,
    initial,
    error,
}: ControlledCheckboxProps) {

    console.log(error?.message);

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange} }) => (
                <Checkbox
                    label={name}
                    initial={initial}
                    onChange={onChange}
                    validationMessage={error?.message}
                />
            )}
        />
    );
}