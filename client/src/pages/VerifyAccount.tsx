import { Form, Formik } from "formik";
import jwtDecode, { JwtHeader, JwtPayload } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import AuthLayout from "../components/layouts/AuthLayout";
import { useVerifyEmailAddressMutation } from "../generated/graphql";
import {
    AuthButton,
    AuthForm,
    AuthFormContent,
    AuthFormTitle,
    PageBlock,
    PageTextMB24,
    Status,
} from "../styles/global";

function VerifyAccount() {
    const navigate = useNavigate();
    const params = useParams();

    const [verifyEmailAddress] = useVerifyEmailAddressMutation();

    useEffect(() => {
        try {
            const header = jwtDecode<JwtHeader>(params.token!);
            const payload = jwtDecode<JwtPayload>(params.token!);
            if (header && payload) {
                console.log("Valid JWT token");
            }
        } catch (error) {
            navigate("/");
        }
    }, [navigate, params.token]);

    return (
        <>
            <Head
                title="Verifica il tuo indirizzo email | EcoPalMaps"
                description="Verifica il tuo indirizzo email per accedere a EcoPalMaps."
            />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>
                            Verifica il tuo indirizzo email
                        </AuthFormTitle>
                        <PageTextMB24>
                            Clicca il seguente pulsante per verificare
                            l'indirizzo email associato al tuo account.
                        </PageTextMB24>
                        <Formik
                            initialValues={{ token: params.token! }}
                            onSubmit={async (values, { setStatus }) => {
                                const response = await verifyEmailAddress({
                                    variables: values,
                                });

                                const { exp } = jwtDecode<JwtPayload>(
                                    params.token!
                                );

                                if (Date.now() >= exp! * 1000) {
                                    setStatus(
                                        "Il tuo token è scaduto. Per favore ripeti l'operazione di verifica dell'indirizzo email."
                                    );
                                } else {
                                    setStatus(
                                        response.data?.verifyEmailAddress.status
                                    );
                                }
                            }}
                        >
                            {({ status }) => (
                                <Form>
                                    {status ? <Status>{status}</Status> : null}
                                    <AuthFormContent>
                                        <PageBlock>
                                            <AuthButton type="submit">
                                                Verifica il tuo account
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

export default VerifyAccount;
