import React from "react";
import { InputFieldProps } from "../../types/types";

const InputField: React.FC<InputFieldProps> = ({label, value, type, required, name, onChangeHandler}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChangeHandler}
                required={required}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
    );
};

export default InputField;
