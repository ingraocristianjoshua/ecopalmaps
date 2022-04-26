import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Head from "../components/Head";
import InputField from "../components/input/InputField";
import AuthLayout from "../components/layouts/AuthLayout";
import {
    MeDocument,
    MeQuery,
    useLogInMutation,
    User,
} from "../generated/graphql";
import {
    AuthButton,
    AuthForm,
    AuthFormContent,
    AuthFormTitle,
    PageBlock,
    Status,
} from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";
import { setAccessToken } from "../utils/token";

function Login() {
    const [login] = useLogInMutation();

    const navigate = useNavigate();

    return (
        <>
            <Head
                title="Accedi | EcoPalMaps"
                description="Accedi a EcoPalMaps."
            />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>Accedi</AuthFormTitle>
                        <Formik
                            initialValues={{ input: "", password: "" }}
                            onSubmit={async (
                                values,
                                { setErrors, setStatus }
                            ) => {
                                const response = await login({
                                    variables: values,
                                    update: (store, { data }) => {
                                        if (data) {
                                            store.writeQuery<MeQuery>({
                                                query: MeDocument,
                                                data: {
                                                    me: data.login
                                                        ?.user as User,
                                                },
                                            });
                                        }
                                    },
                                });

                                if (
                                    response.data?.login?.user &&
                                    response.data.login.errors?.length === 0 &&
                                    response.data.login.accessToken
                                ) {
                                    setAccessToken(
                                        response.data.login.accessToken!
                                    );
                                    setStatus(response.data.login.status);
                                    navigate(0);
                                } else {
                                    if (response.data?.login?.status) {
                                        setStatus(response.data.login.status);
                                    } else {
                                        setStatus(null);
                                        setErrors(
                                            toErrorMap(
                                                response.data?.login?.errors!
                                            )
                                        );
                                    }
                                }
                            }}
                        >
                            {({ errors, status, isSubmitting }) => (
                                <Form>
                                    {status ? <Status>{status}</Status> : null}
                                    <AuthFormContent>
                                        <InputField
                                            field="input"
                                            type="text"
                                            placeholder="Username o email"
                                            errors={errors}
                                        />
                                        <InputField
                                            field="password"
                                            type="password"
                                            placeholder="Password"
                                            errors={errors}
                                        />
                                        <PageBlock>
                                            <AuthButton type="submit">
                                                {isSubmitting ? (
                                                    <>Stai accedendo...</>
                                                ) : (
                                                    <>Accedi</>
                                                )}
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

export default Login;
