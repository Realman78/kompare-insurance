export type Coverage = {
    _id: string;
    name: string;
    type: string;
    values: number[];
    ageCondition?: number;
}

export type Discount = {
    _id: string;
    name: string;
    type: string;
    values: number[];
    vehiclePowerCondition?: number;
    selectedCondition?: number;
}

export type Transactional = {
    name: string;
    value: number;
}

export type Additional = {
    // Coverage or discount
    name: string,
    value: number
}

export type SubmitComponentProps = {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>
    loading: boolean;
    isFormValid: boolean;
    isFormLocked: boolean;
    setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RTSubmitComponentProps = {
    handleTransactionalChange: (id: string) => void;
    loading: boolean;
};

export type InputFieldProps = {
    label: string;
    required: boolean;
    value: string | number | undefined;
    type: string;
    name: string;
    isFormLocked: boolean;
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}