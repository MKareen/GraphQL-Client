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
