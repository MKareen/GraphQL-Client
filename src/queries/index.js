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
