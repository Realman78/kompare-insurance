import React from 'react'


type CheckboxProps = {
    transactionalName: string;
    transactionalId: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    disabled?: boolean;
    invisible?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ transactionalName, transactionalId, handleChange, checked, disabled = false, invisible = false}) => {
    return (
        <div key={transactionalId} className={`${invisible ? 'hidden' : 'flex'} items-center mb-2`}>
            <label className="flex items-center h-full">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    className="mr-2"
                    disabled={disabled}
                />
                <span>{transactionalName}</span>
            </label>
        </div>
    )
}

export default Checkbox