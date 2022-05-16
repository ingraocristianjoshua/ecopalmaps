import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import ProfileSubLayout from "../components/layouts/sublayouts/ProfileSubLayout";
import styled from "styled-components";
import {
    AuthButton,
    FormContent,
    PageBlock,
    Status,
    PageText,
    Button,
} from "../styles/global";
import { useModal } from "../components/modal/useModal";
import { Modal } from "../components/modal/Modal";
import { Form, Formik } from "formik";
import {
    useDeleteUserMutation,
    useModifyPasswordMutation,
} from "../generated/graphql";
import InputField from "../components/input/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useNavigate } from "react-router-dom";

const OptionBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const BlockTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 20px;
`;

export const RedButton = styled(Button)`
    background-color: red;
    color: #ffffff;
`;

function ProfileSettings() {
    const { isShown: isModifyPasswordShown, toggle: modifyPasswordToggle } =
        useModal();
    const [modifyPassword] = useModifyPasswordMutation();
    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();
    const { isShown: isDeleteUserShown, toggle: deleteUserToggle } = useModal();

    return (
        <>
            <Head
                title="Impostazioni | EcoPalMaps"
                description="Questa pagina è dedicata alle impostazioni del tuo account."
            />
            <PageLayout
                content={
                    <ProfileSubLayout
                        children={
                            <>
                                <OptionBlock>
                                    <BlockTitle>
                                        Modifica la tua password
                                    </BlockTitle>
                                    <PageText>
                                        Cliccando il pulsante qui sotto puoi
                                        modificare facilmente la tua password.
                                    </PageText>
                                    <PageBlock>
                                        <AuthButton
                                            type="submit"
                                            onClick={modifyPasswordToggle}
                                        >
                                            Modifica password
                                        </AuthButton>
                                    </PageBlock>
                                </OptionBlock>
                                <Modal
                                    isShown={isModifyPasswordShown}
                                    hide={modifyPasswordToggle}
                                    headerText="Modifica la tua password"
                                    modalContent={
                                        <Formik
                                            initialValues={{
                                                password: "",
                                                confirmPassword: "",
                                            }}
                                            onSubmit={async (
                                                values,
                                                { setStatus, setErrors }
                                            ) => {
                                                const response =
                                                    await modifyPassword({
                                                        variables: values,
                                                    });

                                                if (
                                                    response.data
                                                        ?.modifyPassword.errors
                                                        ?.length !== 0
                                                ) {
                                                    setStatus(null);
                                                    setErrors(
                                                        toErrorMap(
                                                            response.data
                                                                ?.modifyPassword
                                                                .errors!
                                                        )
                                                    );
                                                } else {
                                                    setStatus(
                                                        response.data
                                                            .modifyPassword
                                                            .status
                                                    );
                                                }
                                            }}
                                        >
                                            {({ status, errors }) => (
                                                <Form>
                                                    {status ? (
                                                        <Status>
                                                            {status}
                                                        </Status>
                                                    ) : null}
                                                    <FormContent>
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
                                                            <AuthButton type="submit">
                                                                Modifica la tua
                                                                password
                                                            </AuthButton>
                                                        </PageBlock>
                                                    </FormContent>
                                                </Form>
                                            )}
                                        </Formik>
                                    }
                                />
                                <OptionBlock>
                                    <BlockTitle>
                                        Cancella il tuo account
                                    </BlockTitle>
                                    <PageText>
                                        Qui puoi cancellare definitivamente il
                                        tuo account. L'operazione, una volta
                                        confermata, non può essere annullata.
                                    </PageText>
                                    <PageBlock>
                                        <RedButton
                                            type="submit"
                                            onClick={deleteUserToggle}
                                        >
                                            Cancella dati
                                        </RedButton>
                                    </PageBlock>
                                </OptionBlock>
                                <Modal
                                    isShown={isDeleteUserShown}
                                    hide={deleteUserToggle}
                                    headerText="Cancella il tuo account"
                                    modalContent={
                                        <Formik
                                            initialValues={{
                                                password: "",
                                            }}
                                            onSubmit={async (
                                                values,
                                                { setStatus, setErrors }
                                            ) => {
                                                const response =
                                                    await deleteUser({
                                                        variables: values,
                                                    });

                                                if (
                                                    response.data?.deleteUser
                                                        .errors?.length !== 0
                                                ) {
                                                    setStatus(null);
                                                    setErrors(
                                                        toErrorMap(
                                                            response.data
                                                                ?.deleteUser
                                                                .errors!
                                                        )
                                                    );
                                                } else {
                                                    setStatus(
                                                        response.data.deleteUser
                                                            .status
                                                    );

                                                    navigate(0);
                                                }
                                            }}
                                        >
                                            {({ status, errors }) => (
                                                <Form>
                                                    {status ? (
                                                        <Status>
                                                            {status}
                                                        </Status>
                                                    ) : null}
                                                    <FormContent>
                                                        <InputField
                                                            field="password"
                                                            type="password"
                                                            placeholder="Password"
                                                            errors={errors}
                                                        />
                                                        <PageBlock>
                                                            <RedButton type="submit">
                                                                Cancella il tuo
                                                                account
                                                            </RedButton>
                                                        </PageBlock>
                                                    </FormContent>
                                                </Form>
                                            )}
                                        </Formik>
                                    }
                                />
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default ProfileSettings;
