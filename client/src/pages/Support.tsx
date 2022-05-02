import { Field, Form, Formik } from "formik";
import Head from "../components/Head";
import InputField from "../components/input/InputField";
import PageLayout from "../components/layouts/PageLayout";
import styled from "styled-components";
import {
    Button,
    PageBlock,
    PageContent,
    PageText,
    PageTitle,
    Status,
} from "../styles/global";
import { useSendFormSupportMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const FormButton = styled(Button)`
    background-color: #edd035;
    color: #ffffff;
`;

const FormTextAreaContainer = styled.div`
    display: block;
    background-color: #c7c5bc;
    padding-left: 18px;
    padding-right: 18px;
    border-radius: 18px;
`;

const FormTextAreaLabel = styled.label`
    display: inline-block;
    vertical-align: text-top;
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 8px;
    cursor: pointer;
`;

const FormTextAreaInnerContainer = styled.div`
    display: block;
    margin-bottom: 8px;
`;

const FormObjectContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const FormObjectError = styled.div`
    display: block;
    font-size: 14px;
`;

function Support() {
    const [sendForm] = useSendFormSupportMutation();

    return (
        <>
            <Head
                title="Supporto | EcoPalMaps"
                description="In questa pagina troverai tutte le istruzioni per ricevere supporto."
            />
            <PageLayout
                content={
                    <PageContent>
                        <PageTitle>Contatta il supporto</PageTitle>
                        <PageText>
                            Per qualsiasi problema, puoi compilare il seguente
                            modulo oppure contattarci tramite questa email:{" "}
                            <a
                                href="mailto:support@ecopalmaps.com"
                                title="Email di supporto"
                            >
                                support@ecopalmaps.com
                            </a>
                            .
                        </PageText>
                        <PageBlock>
                            <Formik
                                initialValues={{
                                    fullName: "",
                                    email: "",
                                    subject: "",
                                    message: "",
                                }}
                                onSubmit={async (
                                    values,
                                    { setErrors, setStatus }
                                ) => {
                                    const response = await sendForm({
                                        variables: values,
                                    });

                                    if (
                                        response.data?.sendFormSupport.errors
                                            ?.length !== 0
                                    ) {
                                        setStatus(null);
                                        setErrors(
                                            toErrorMap(
                                                response.data?.sendFormSupport
                                                    .errors!
                                            )
                                        );
                                    } else {
                                        setStatus(
                                            response.data.sendFormSupport.status
                                        );
                                    }
                                }}
                            >
                                {({ errors, status, isSubmitting }) => (
                                    <Form>
                                        {status ? (
                                            <Status>{status}</Status>
                                        ) : null}
                                        <FormContent>
                                            <InputField
                                                field="fullName"
                                                type="text"
                                                placeholder="Nome completo"
                                                errors={errors}
                                            />
                                            <InputField
                                                field="email"
                                                type="email"
                                                placeholder="Email"
                                                errors={errors}
                                            />
                                            <InputField
                                                field="subject"
                                                type="text"
                                                placeholder="Oggetto"
                                                errors={errors}
                                            />
                                            <FormObjectContainer>
                                                {errors["message"] ? (
                                                    <FormObjectError>
                                                        {errors["message"]}
                                                    </FormObjectError>
                                                ) : null}
                                                <FormTextAreaContainer>
                                                    <FormTextAreaLabel htmlFor="message">
                                                        Messaggio
                                                    </FormTextAreaLabel>
                                                    <FormTextAreaInnerContainer>
                                                        <Field
                                                            as="textarea"
                                                            id={"message"}
                                                            name={"message"}
                                                            rows={3}
                                                        />
                                                    </FormTextAreaInnerContainer>
                                                </FormTextAreaContainer>
                                            </FormObjectContainer>
                                            <PageBlock>
                                                <FormButton type="submit">
                                                    {isSubmitting ? (
                                                        <>Stai inviando...</>
                                                    ) : (
                                                        <>Invia messaggio</>
                                                    )}
                                                </FormButton>
                                            </PageBlock>
                                        </FormContent>
                                    </Form>
                                )}
                            </Formik>
                        </PageBlock>
                    </PageContent>
                }
            />
        </>
    );
}

export default Support;
