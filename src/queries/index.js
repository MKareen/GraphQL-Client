import { gql } from 'apollo-boost';

export const GET_ALL_USERS = gql`
    query {
        usersList {
            id
            fullName
            email
            createdAt
            updatedAt    
        }
    }
`;

export const GET_CURRENT_USER = gql`
    query {
        currentUser {
            id
            email
            fullName
            createdAt
        }
    }
`;
