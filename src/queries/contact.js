import { gql } from 'apollo-boost';

export const GET_CONTACT = gql`
    query($id: ID!) {
        contact(id: $id) {
            id
            owner
            firstName
            lastName
            isFavourite
            email
            phone 
            address
        }
    }
`;

export const SEARCH_CONTACT = gql`
    query($q: String) {
        searchContact(q: $q) {
            id
            firstName
            lastName
            phone
            email
            address
            isFavourite
            createdAt
        }
    }
`;

export const GET_USER_CONTACTS = gql`
    query {
        userContacts {
            id
            firstName
            lastName
            email
            phone 
            address
            isFavourite
            createdAt
        }
    }
`;
