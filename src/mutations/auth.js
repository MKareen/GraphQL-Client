import { gql } from 'apollo-boost';
import { userFragment } from '../fragments/user';

export const SIGNUP_USER = gql`
    mutation($fullName: String!, $email: String!, $password: String!) {
        signup(fullName: $fullName, email: $email, password: $password) {
            accessToken
            user {
                ...CompleteUser
            }
        }
    }
    ${userFragment}
`;

export const LOGIN_USER = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
            user {
                ...CompleteUser
            }
        }
    }
    ${userFragment}
`;
