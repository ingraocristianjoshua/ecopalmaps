import { Field } from "formik";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Eye from "../icons/Eye";

export interface InputFieldProps {
    field: string;
    type: string;
    placeholder: string;
    errors: any;
}

const InputFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const InputFieldError = styled.div`
    display: block;
    font-size: 14px;
`;

const InputFieldContainer = styled.div`
    display: block;
    background-color: #C7C5BC;
    height: 72px;
    padding-left: 18px;
    padding-right: 18px;
    border-radius: 18px;
`;

const InputInfoContainer = styled.div.attrs((props: { focus: boolean }) => props)`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: flex-start;
    height: 22px;
    margin-top: ${(props) => props.focus ? "8px" : "25px"};
    margin-bottom: ${props => props.focus ? "8px" : "0px"};
    transition: margin ease 0.4s;
`;

const LabelInputInfo = styled.label.attrs((props: { focus: boolean }) => props)`
    display: block;
    font-size: ${(props) => props.focus ? "14px" : "18px"};
    cursor: pointer;
    transition: font-size ease 0.4s;
`;

const InputContainer = styled.div.attrs((props: { focus: boolean }) => props)`
    display: flex;
    align-items: center;
    height: 26px;
    width: 100%;
    margin-top: ${(props) => props.focus ? "38px" : "23px"};
    transition: margin ease 0.4s;
`;

const InputContainerField = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 12px;
`;

const ShowPassword = styled.div`
    display: block;
    cursor: pointer;
`;

const InputField: FunctionComponent<InputFieldProps> = ({
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

    const [isFocused, setIsFocused] = useState(false);

    const inputField = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputField !== null && inputField.current?.value !== "") {
            setIsFocused(true);
        }
    }, [isFocused]);

    return (
        <InputFieldWrapper>
            {errors[field] ? (
                <InputFieldError>{errors[field]}</InputFieldError>
            ) : null}
            <InputFieldContainer
                onClick={() => {
                    setIsFocused(true);

                    if (inputField !== null) {
                        inputField.current?.focus();
                    }
                }}
            >
                <InputInfoContainer focus={isFocused}>
                    <LabelInputInfo htmlFor={field} focus={isFocused}>
                        {placeholder}
                    </LabelInputInfo>
                </InputInfoContainer>
                <InputContainer focus={isFocused}>
                    <InputContainerField>
                        <Field
                            id={field}
                            autoCapitalize="none"
                            spellCheck="false"
                            autoComplete="off"
                            autoCorrect="off"
                            name={field}
                            type={isPassword ? showType : type}
                            onFocus={() => {
                                setIsFocused(true);
                            }}
                            onBlur={() => {
                                setIsFocused(false);
                            }}
                            innerRef={inputField}
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
                    </InputContainerField>
                </InputContainer>
            </InputFieldContainer>
        </InputFieldWrapper>
    );
};

export default InputField;
