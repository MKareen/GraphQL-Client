import { gql } from 'apollo-boost';

export const SIGNUP_USER = gql`
    mutation($fullName: String!, $email: String!, $password: String!) {
        signup(fullName: $fullName, email: $email, password: $password) {
            accessToken
            user {
                id
                fullName
                email
                createdAt
                updatedAt    
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
            user {
                id
                email
                fullName
                createdAt
                updatedAt
            }
        }
    }
`;