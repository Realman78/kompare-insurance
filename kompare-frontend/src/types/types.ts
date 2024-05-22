export type Coverage = {
    name: string;
    type: string;
    values: number[];
    ageCondition?: number;
}

export type Discount = {
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

export type SubmitComponentProps = {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>
    loading: boolean;
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
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}