import React from "react";
import { InputFieldProps } from "../../types/types";

const InputField: React.FC<InputFieldProps> = ({label, value, type, required, isFormLocked, name, onChangeHandler}) => {
    return (
        <div className={`${isFormLocked ? "[&>*]:cursor-not-allowed" : ""}`}>
            <label className="block text-sm font-medium text-gray-700">{label}{isFormLocked ? "🔒" : "" }</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChangeHandler}
                required={required}
                disabled={isFormLocked}
                className={`mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isFormLocked ? "bg-slate-200" : ""}`}
            />
        </div>
    );
};

export default InputField;