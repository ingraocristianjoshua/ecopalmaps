import { Field } from "formik";
import { FunctionComponent } from "react";
import SelectComponent from "./SelectComponent";
import styled from "styled-components";

export interface SelectFieldProps {
    field: string;
    placeholder: string;
    options: any;
    errors: any;
}

const CustomFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const CustomFieldError = styled.div`
    display: block;
    font-size: 14px;
`;

const CustomFieldContainer = styled.div`
    display: block;
    background-color: #C7C5BC;
    height: 72px;
    padding-left: 18px;
    padding-right: 18px;
    border-radius: 18px;
`;

const CustomInfoContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: flex-start;
    height: 22px;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const CustomInfo = styled.div`
    display: block;
    font-size: 14px;
    cursor: pointer;
`;

const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    height: 26px;
    width: 100%;
    margin-top: 38px;
`;

const SelectField: FunctionComponent<SelectFieldProps> = ({
    field,
    placeholder,
    options,
    errors,
}) => {
    return (
        <CustomFieldWrapper>
            {errors[field] ? (
                <CustomFieldError>{errors[field]}</CustomFieldError>
            ) : null}
            <CustomFieldContainer>
                <CustomInfoContainer>
                    <CustomInfo>{placeholder}</CustomInfo>
                </CustomInfoContainer>
                <SelectContainer>
                    <Field
                        name={field}
                        component={SelectComponent}
                        options={options}
                    />
                </SelectContainer>
            </CustomFieldContainer>
        </CustomFieldWrapper>
    );
};

export default SelectField;