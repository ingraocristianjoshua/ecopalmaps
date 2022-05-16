import { Form, Formik } from "formik";
import Head from "../components/Head";
import DatePickerField from "../components/input/datepicker/DatePickerField";
import InputField from "../components/input/InputField";
import SelectField from "../components/input/select/SelectField";
import AuthLayout from "../components/layouts/AuthLayout";
import {
    MeDocument,
    MeQuery,
    useSignUpMutation,
    User,
} from "../generated/graphql";
import {
    AuthButton,
    AuthForm,
    AuthFormContent,
    AuthFormTitle,
    AuthHalfInput,
    PageBlock,
    Status,
} from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";

function Signup() {
    const [signup] = useSignUpMutation();

    const genderOptions = [
        { value: "Genere", label: "Genere" },
        { value: "Donna", label: "Donna" },
        { value: "Uomo", label: "Uomo" },
        { value: "Non binario", label: "Non binario" },
    ];

    return (
        <>
            <Head
                title="Registrati | EcoPalMaps"
                description="Registrati a EcoPalMaps."
            />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>Registrati</AuthFormTitle>
                        <Formik
                            initialValues={{
                                birthDate: Date(),
                                gender: "",
                                firstName: "",
                                lastName: "",
                                email: "",
                                username: "",
                                password: "",
                            }}
                            onSubmit={async (
                                values,
                                { setErrors, setStatus }
                            ) => {
                                const response = await signup({
                                    variables: values,
                                    update: (store, { data }) => {
                                        if (data) {
                                            store.writeQuery<MeQuery>({
                                                query: MeDocument,
                                                data: {
                                                    me: data.signup
                                                        ?.user as User,
                                                },
                                            });
                                        }
                                    },
                                });

                                if (response.data?.signup?.user) {
                                    setStatus(response.data.signup.status);
                                } else {
                                    setStatus(null);
                                    setErrors(
                                        toErrorMap(
                                            response.data?.signup?.errors!
                                        )
                                    );
                                }
                            }}
                        >
                            {({ errors, status }) => (
                                <Form>
                                    {status ? <Status>{status}</Status> : null}
                                    <AuthFormContent>
                                        <AuthHalfInput>
                                            <DatePickerField
                                                field="birthDate"
                                                placeholder="Data di nascita"
                                            />
                                            <SelectField
                                                field="gender"
                                                placeholder="Genere"
                                                errors={errors}
                                                options={genderOptions}
                                            />
                                        </AuthHalfInput>
                                        <AuthHalfInput>
                                            <InputField
                                                field="firstName"
                                                type="text"
                                                placeholder="Nome"
                                                errors={errors}
                                            />
                                            <InputField
                                                field="lastName"
                                                type="text"
                                                placeholder="Cognome"
                                                errors={errors}
                                            />
                                        </AuthHalfInput>
                                        <InputField
                                            field="email"
                                            type="email"
                                            placeholder="Email"
                                            errors={errors}
                                        />
                                        <InputField
                                            field="username"
                                            type="text"
                                            placeholder="Username"
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
                                                Registrati
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

export default Signup;
