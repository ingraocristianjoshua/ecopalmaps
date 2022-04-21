import { Form, Formik } from "formik";
import Head from "../components/Head";
import InputField from "../components/input/InputField";
import AuthLayout from "../components/layouts/AuthLayout";
import { useSendRecoverEmailMutation } from "../generated/graphql";
import { AuthButton, AuthForm, AuthFormContent, AuthFormTitle, PageBlock, PageTextMB24, Status } from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";

function RecoverPassword() {
    const [sendEmail] = useSendRecoverEmailMutation();

    return (
        <>
            <Head
                title="Recupera la tua password | EcoPalMaps"
                description="Recupera la tua password per accedere a EcoPalMaps."
            />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>
                            Recupera la tua password
                        </AuthFormTitle>
                        <PageTextMB24>
                            In questa pagina puoi recuperare la tua password utilizzando l'indirizzo email associato al tuo account.
                        </PageTextMB24>
                        <Formik
                            initialValues={{ email: "" }}
                            onSubmit={async (
                                values,
                                { setErrors, setStatus }
                            ) => {
                                const response = await sendEmail({
                                    variables: values,
                                });

                                if (
                                    response.data?.sendRecoverEmail.errors
                                        ?.length !== 0
                                ) {
                                    setStatus(null);
                                    setErrors(
                                        toErrorMap(
                                            response.data?.sendRecoverEmail
                                                .errors!
                                        )
                                    );
                                } else {
                                    setStatus(
                                        response.data.sendRecoverEmail.status
                                    );
                                }
                            }}
                        >
                            {({ errors, status }) => (
                                <Form>
                                    {status ? (
                                        <Status>{status}</Status>
                                    ) : null}
                                    <AuthFormContent>
                                        <InputField
                                            field="email"
                                            type="email"
                                            placeholder="Email"
                                            errors={errors}
                                        />
                                        <PageBlock>
                                            <AuthButton type="submit">
                                                Recupera la tua password
                                            </AuthButton>
                                        </PageBlock>
                                    </AuthFormContent>
                                </Form>
                            )}
                        </Formik>
                    </AuthForm>
                }
            />
        </>
    );
}

export default RecoverPassword;
