import { gql } from 'apollo-boost';

export const userFragment =  gql`
    fragment CompleteUser on UserType {
        id
        fullName
        email
        createdAt
        favourites {
            id
            owner
            firstName
            lastName
            email
            phone
            address
            createdAt
        }
    }
`;

