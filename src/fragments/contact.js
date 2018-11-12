import { gql } from 'apollo-boost';

export const contactFragments = gql`
    fragment CompleteContact on ContactType {
        id
        owner
        firstName
        lastName
        email
        phone 
        address
        isFavourite
        createdAt
    }
`;
