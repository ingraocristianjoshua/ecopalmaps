import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: any;
};

export type FieldError = {
    __typename?: "FieldError";
    field?: Maybe<Scalars["String"]>;
    message: Scalars["String"];
};

export type Mutation = {
    __typename?: "Mutation";
    login?: Maybe<UserResponse>;
    logout: Scalars["Boolean"];
    notAuthModifyPassword: UserResponse;
    revokeRefreshTokensForUser: Scalars["Boolean"];
    sendFormSupport: UserResponse;
    sendRecoverEmail: UserResponse;
    signup?: Maybe<UserResponse>;
    verifyEmailAddress: UserResponse;
};

export type MutationLoginArgs = {
    input: Scalars["String"];
    password: Scalars["String"];
};

export type MutationNotAuthModifyPasswordArgs = {
    confirmPassword: Scalars["String"];
    password: Scalars["String"];
    token: Scalars["String"];
};

export type MutationRevokeRefreshTokensForUserArgs = {
    id: Scalars["Float"];
};

export type MutationSendFormSupportArgs = {
    email: Scalars["String"];
    fullName: Scalars["String"];
    message: Scalars["String"];
    subject: Scalars["String"];
};

export type MutationSendRecoverEmailArgs = {
    email: Scalars["String"];
};

export type MutationSignupArgs = {
    birthDate: Scalars["DateTime"];
    email: Scalars["String"];
    firstName: Scalars["String"];
    gender: Scalars["String"];
    lastName: Scalars["String"];
    password: Scalars["String"];
    title: Scalars["String"];
    username: Scalars["String"];
};

export type MutationVerifyEmailAddressArgs = {
    token: Scalars["String"];
};

export type Query = {
    __typename?: "Query";
    me?: Maybe<User>;
};

export type User = {
    __typename?: "User";
    birthDate: Scalars["String"];
    email: Scalars["String"];
    firstName: Scalars["String"];
    gender: Scalars["String"];
    id: Scalars["Int"];
    lastName: Scalars["String"];
    title: Scalars["String"];
    username: Scalars["String"];
    verified: Scalars["Boolean"];
};

export type UserResponse = {
    __typename?: "UserResponse";
    accessToken?: Maybe<Scalars["String"]>;
    errors?: Maybe<Array<FieldError>>;
    status?: Maybe<Scalars["String"]>;
    user?: Maybe<User>;
};

export type LogInMutationVariables = Exact<{
    input: Scalars["String"];
    password: Scalars["String"];
}>;

export type LogInMutation = {
    __typename?: "Mutation";
    login?:
        | {
              __typename?: "UserResponse";
              accessToken?: string | null | undefined;
              status?: string | null | undefined;
              user?:
                  | {
                        __typename?: "User";
                        id: number;
                        username: string;
                        firstName: string;
                        lastName: string;
                        email: string;
                        birthDate: string;
                        gender: string;
                        title: string;
                        verified: boolean;
                    }
                  | null
                  | undefined;
              errors?:
                  | Array<{
                        __typename?: "FieldError";
                        field?: string | null | undefined;
                        message: string;
                    }>
                  | null
                  | undefined;
          }
        | null
        | undefined;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
    __typename?: "Query";
    me?:
        | {
              __typename?: "User";
              id: number;
              username: string;
              firstName: string;
              lastName: string;
              email: string;
              birthDate: string;
              gender: string;
              title: string;
              verified: boolean;
          }
        | null
        | undefined;
};

export type NotAuthModifyPasswordMutationVariables = Exact<{
    token: Scalars["String"];
    confirmPassword: Scalars["String"];
    password: Scalars["String"];
}>;

export type NotAuthModifyPasswordMutation = {
    __typename?: "Mutation";
    notAuthModifyPassword: {
        __typename?: "UserResponse";
        status?: string | null | undefined;
        errors?:
            | Array<{
                  __typename?: "FieldError";
                  field?: string | null | undefined;
                  message: string;
              }>
            | null
            | undefined;
    };
};

export type SendFormSupportMutationVariables = Exact<{
    fullName: Scalars["String"];
    email: Scalars["String"];
    subject: Scalars["String"];
    message: Scalars["String"];
}>;

export type SendFormSupportMutation = {
    __typename?: "Mutation";
    sendFormSupport: {
        __typename?: "UserResponse";
        status?: string | null | undefined;
        errors?:
            | Array<{
                  __typename?: "FieldError";
                  field?: string | null | undefined;
                  message: string;
              }>
            | null
            | undefined;
    };
};

export type SendRecoverEmailMutationVariables = Exact<{
    email: Scalars["String"];
}>;

export type SendRecoverEmailMutation = {
    __typename?: "Mutation";
    sendRecoverEmail: {
        __typename?: "UserResponse";
        status?: string | null | undefined;
        errors?:
            | Array<{
                  __typename?: "FieldError";
                  field?: string | null | undefined;
                  message: string;
              }>
            | null
            | undefined;
    };
};

export type SignUpMutationVariables = Exact<{
    birthDate: Scalars["DateTime"];
    gender: Scalars["String"];
    title: Scalars["String"];
    password: Scalars["String"];
    lastName: Scalars["String"];
    firstName: Scalars["String"];
    username: Scalars["String"];
    email: Scalars["String"];
}>;

export type SignUpMutation = {
    __typename?: "Mutation";
    signup?:
        | {
              __typename?: "UserResponse";
              status?: string | null | undefined;
              user?:
                  | {
                        __typename?: "User";
                        id: number;
                        username: string;
                        email: string;
                        firstName: string;
                        lastName: string;
                        gender: string;
                        title: string;
                        birthDate: string;
                        verified: boolean;
                    }
                  | null
                  | undefined;
              errors?:
                  | Array<{
                        __typename?: "FieldError";
                        field?: string | null | undefined;
                        message: string;
                    }>
                  | null
                  | undefined;
          }
        | null
        | undefined;
};

export type VerifyEmailAddressMutationVariables = Exact<{
    token: Scalars["String"];
}>;

export type VerifyEmailAddressMutation = {
    __typename?: "Mutation";
    verifyEmailAddress: {
        __typename?: "UserResponse";
        status?: string | null | undefined;
    };
};

export const LogInDocument = gql`
    mutation logIn($input: String!, $password: String!) {
        login(input: $input, password: $password) {
            user {
                id
                username
                firstName
                lastName
                email
                birthDate
                gender
                title
                verified
            }
            errors {
                field
                message
            }
            accessToken
            status
        }
    }
`;
export type LogInMutationFn = Apollo.MutationFunction<
    LogInMutation,
    LogInMutationVariables
>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LogInMutation,
        LogInMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LogInMutation, LogInMutationVariables>(
        LogInDocument,
        options
    );
}
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<
    LogInMutation,
    LogInMutationVariables
>;
export const LogoutDocument = gql`
    mutation Logout {
        logout
    }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
    LogoutMutation,
    LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LogoutMutation,
        LogoutMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
        LogoutDocument,
        options
    );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
    LogoutMutation,
    LogoutMutationVariables
>;
export const MeDocument = gql`
    query Me {
        me {
            id
            username
            firstName
            lastName
            email
            birthDate
            gender
            title
            verified
        }
    }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
    baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NotAuthModifyPasswordDocument = gql`
    mutation notAuthModifyPassword(
        $token: String!
        $confirmPassword: String!
        $password: String!
    ) {
        notAuthModifyPassword(
            token: $token
            confirmPassword: $confirmPassword
            password: $password
        ) {
            status
            errors {
                field
                message
            }
        }
    }
`;
export type NotAuthModifyPasswordMutationFn = Apollo.MutationFunction<
    NotAuthModifyPasswordMutation,
    NotAuthModifyPasswordMutationVariables
>;

/**
 * __useNotAuthModifyPasswordMutation__
 *
 * To run a mutation, you first call `useNotAuthModifyPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotAuthModifyPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notAuthModifyPasswordMutation, { data, loading, error }] = useNotAuthModifyPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      confirmPassword: // value for 'confirmPassword'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useNotAuthModifyPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<
        NotAuthModifyPasswordMutation,
        NotAuthModifyPasswordMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        NotAuthModifyPasswordMutation,
        NotAuthModifyPasswordMutationVariables
    >(NotAuthModifyPasswordDocument, options);
}
export type NotAuthModifyPasswordMutationHookResult = ReturnType<
    typeof useNotAuthModifyPasswordMutation
>;
export type NotAuthModifyPasswordMutationResult =
    Apollo.MutationResult<NotAuthModifyPasswordMutation>;
export type NotAuthModifyPasswordMutationOptions = Apollo.BaseMutationOptions<
    NotAuthModifyPasswordMutation,
    NotAuthModifyPasswordMutationVariables
>;
export const SendFormSupportDocument = gql`
    mutation sendFormSupport(
        $fullName: String!
        $email: String!
        $subject: String!
        $message: String!
    ) {
        sendFormSupport(
            fullName: $fullName
            email: $email
            subject: $subject
            message: $message
        ) {
            status
            errors {
                field
                message
            }
        }
    }
`;
export type SendFormSupportMutationFn = Apollo.MutationFunction<
    SendFormSupportMutation,
    SendFormSupportMutationVariables
>;

/**
 * __useSendFormSupportMutation__
 *
 * To run a mutation, you first call `useSendFormSupportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFormSupportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFormSupportMutation, { data, loading, error }] = useSendFormSupportMutation({
 *   variables: {
 *      fullName: // value for 'fullName'
 *      email: // value for 'email'
 *      subject: // value for 'subject'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendFormSupportMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SendFormSupportMutation,
        SendFormSupportMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        SendFormSupportMutation,
        SendFormSupportMutationVariables
    >(SendFormSupportDocument, options);
}
export type SendFormSupportMutationHookResult = ReturnType<
    typeof useSendFormSupportMutation
>;
export type SendFormSupportMutationResult =
    Apollo.MutationResult<SendFormSupportMutation>;
export type SendFormSupportMutationOptions = Apollo.BaseMutationOptions<
    SendFormSupportMutation,
    SendFormSupportMutationVariables
>;
export const SendRecoverEmailDocument = gql`
    mutation sendRecoverEmail($email: String!) {
        sendRecoverEmail(email: $email) {
            status
            errors {
                field
                message
            }
        }
    }
`;
export type SendRecoverEmailMutationFn = Apollo.MutationFunction<
    SendRecoverEmailMutation,
    SendRecoverEmailMutationVariables
>;

/**
 * __useSendRecoverEmailMutation__
 *
 * To run a mutation, you first call `useSendRecoverEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendRecoverEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendRecoverEmailMutation, { data, loading, error }] = useSendRecoverEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendRecoverEmailMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SendRecoverEmailMutation,
        SendRecoverEmailMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        SendRecoverEmailMutation,
        SendRecoverEmailMutationVariables
    >(SendRecoverEmailDocument, options);
}
export type SendRecoverEmailMutationHookResult = ReturnType<
    typeof useSendRecoverEmailMutation
>;
export type SendRecoverEmailMutationResult =
    Apollo.MutationResult<SendRecoverEmailMutation>;
export type SendRecoverEmailMutationOptions = Apollo.BaseMutationOptions<
    SendRecoverEmailMutation,
    SendRecoverEmailMutationVariables
>;
export const SignUpDocument = gql`
    mutation signUp(
        $birthDate: DateTime!
        $gender: String!
        $title: String!
        $password: String!
        $lastName: String!
        $firstName: String!
        $username: String!
        $email: String!
    ) {
        signup(
            birthDate: $birthDate
            gender: $gender
            title: $title
            password: $password
            lastName: $lastName
            firstName: $firstName
            username: $username
            email: $email
        ) {
            user {
                id
                username
                email
                firstName
                lastName
                gender
                title
                birthDate
                verified
            }
            errors {
                field
                message
            }
            status
        }
    }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
    SignUpMutation,
    SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      birthDate: // value for 'birthDate'
 *      gender: // value for 'gender'
 *      title: // value for 'title'
 *      password: // value for 'password'
 *      lastName: // value for 'lastName'
 *      firstName: // value for 'firstName'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignUpMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SignUpMutation,
        SignUpMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
        SignUpDocument,
        options
    );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
    SignUpMutation,
    SignUpMutationVariables
>;
export const VerifyEmailAddressDocument = gql`
    mutation verifyEmailAddress($token: String!) {
        verifyEmailAddress(token: $token) {
            status
        }
    }
`;
export type VerifyEmailAddressMutationFn = Apollo.MutationFunction<
    VerifyEmailAddressMutation,
    VerifyEmailAddressMutationVariables
>;

/**
 * __useVerifyEmailAddressMutation__
 *
 * To run a mutation, you first call `useVerifyEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailAddressMutation, { data, loading, error }] = useVerifyEmailAddressMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailAddressMutation(
    baseOptions?: Apollo.MutationHookOptions<
        VerifyEmailAddressMutation,
        VerifyEmailAddressMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        VerifyEmailAddressMutation,
        VerifyEmailAddressMutationVariables
    >(VerifyEmailAddressDocument, options);
}
export type VerifyEmailAddressMutationHookResult = ReturnType<
    typeof useVerifyEmailAddressMutation
>;
export type VerifyEmailAddressMutationResult =
    Apollo.MutationResult<VerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationOptions = Apollo.BaseMutationOptions<
    VerifyEmailAddressMutation,
    VerifyEmailAddressMutationVariables
>;
