import { Form, Formik } from "formik";
import jwtDecode, { JwtHeader, JwtPayload } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import InputField from "../components/input/InputField";
import AuthLayout from "../components/layouts/AuthLayout";
import { useNotAuthModifyPasswordMutation } from "../generated/graphql";
import { AuthButton, AuthForm, AuthFormContent, AuthFormTitle, PageBlock, PageTextMB24, Status } from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";

function ModifyPassword() {
    const navigate = useNavigate();
    const params = useParams();

    const [modifyPassword] = useNotAuthModifyPasswordMutation();

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
    }, []);

    return (
        <>
            <Head
                title="Modifica la tua password | EcoPalMaps"
                description="Modifica la tua password per accedere a EcoPalMaps."
            />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>
                            Modifica la tua password
                        </AuthFormTitle>
                        <PageTextMB24>
                            In questa pagina puoi modificare la tua password.
                        </PageTextMB24>
                        <Formik
                            initialValues={{
                                token: params.token!,
                                password: "",
                                confirmPassword: "",
                            }}
                            onSubmit={async (
                                values,
                                { setStatus, setErrors }
                            ) => {
                                const response = await modifyPassword({
                                    variables: values,
                                });

                                const { exp } = jwtDecode<JwtPayload>(
                                    params.token!
                                );

                                if (Date.now() >= exp! * 1000) {
                                    setStatus(
                                        "Il tuo token è scaduto. Per favore ripeti l'operazione per il recupero della tua password."
                                    );
                                } else {
                                    if (
                                        response.data?.notAuthModifyPassword
                                            .errors?.length !== 0
                                    ) {
                                        setStatus(null);
                                        setErrors(
                                            toErrorMap(
                                                response.data
                                                    ?.notAuthModifyPassword
                                                    .errors!
                                            )
                                        );
                                    } else {
                                        setStatus(
                                            response.data.notAuthModifyPassword
                                                .status
                                        );
                                    }
                                }
                            }}
                        >
                            {({ status, errors }) => (
                                <Form>
                                    {status ? (
                                        <Status>{status}</Status>
                                    ) : null}
                                    <AuthFormContent>
                                        <InputField
                                            field="password"
                                            type="password"
                                            placeholder="Password"
                                            errors={errors}
                                        />
                                        <InputField
                                            field="confirmPassword"
                                            type="password"
                                            placeholder="Confirmation password"
                                            errors={errors}
                                        />
                                        <PageBlock>
                                            <AuthButton
                                                type="submit"
                                            >
                                                Modifica la tua password
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

export default ModifyPassword;
