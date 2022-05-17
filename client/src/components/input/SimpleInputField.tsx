import { Field } from "formik";
import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import Eye from "../icons/Eye";

export interface SimpleInputFieldProps {
    field: string;
    type: string;
    placeholder: string;
    errors: any;
}

const SimpleInputFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const SimpleInputFieldError = styled.div`
    display: block;
    font-size: 14px;
`;

const SimpleInputFieldContainer = styled.div`
    display: block;
    background-color: #c7c5bc;
    height: 72px;
    padding-left: 18px;
    padding-right: 18px;
    border-radius: 18px;
`;

const SimpleInputInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 22px;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const SimpleLabelInputInfo = styled.label`
    display: block;
    font-size: 14px;
    cursor: pointer;
`;

const SimpleInputContainer = styled.div`
    display: flex;
    align-items: center;
    height: 26px;
    width: 100%;
`;

const SimpleInputContainerField = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 12px;
`;

const ShowPassword = styled.div`
    display: block;
    cursor: pointer;
`;

const SimpleInputField: FunctionComponent<SimpleInputFieldProps> = ({
    field,
    type,
    placeholder,
    errors,
}) => {
    let isPassword = false;
    const [switchedType, setSwitchedType] = useState(false);
    let showType;

    if (type === "password") {
        isPassword = true;
    }

    if (!switchedType) {
        showType = "password";
    } else {
        showType = "text";
    }

    return (
        <SimpleInputFieldWrapper>
            {errors[field] ? (
                <SimpleInputFieldError>{errors[field]}</SimpleInputFieldError>
            ) : null}
            <SimpleInputFieldContainer>
                <SimpleInputInfoContainer>
                    <SimpleLabelInputInfo htmlFor={field}>
                        {placeholder}
                    </SimpleLabelInputInfo>
                </SimpleInputInfoContainer>
                <SimpleInputContainer>
                    <SimpleInputContainerField>
                        <Field
                            id={field}
                            autoCapitalize="none"
                            spellCheck="false"
                            autoComplete="off"
                            autoCorrect="off"
                            name={field}
                            type={isPassword ? showType : type}
                        />
                        {isPassword ? (
                            <ShowPassword
                                role="button"
                                onClick={() => {
                                    setSwitchedType(!switchedType);
                                }}
                            >
                                <Eye mode={switchedType} />
                            </ShowPassword>
                        ) : null}
                    </SimpleInputContainerField>
                </SimpleInputContainer>
            </SimpleInputFieldContainer>
        </SimpleInputFieldWrapper>
    );
};

export default SimpleInputField;
