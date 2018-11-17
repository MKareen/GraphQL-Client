import { gql } from 'apollo-boost';
import { contactFragments } from '../fragments/contact';

export const ADD_CONTACT = gql`
    mutation($firstName: String!, $lastName: String, $phone: String!, $email: String, $address: String) {
        addContact (firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, address: $address) {
            ...CompleteContact
        } 
    }
    ${contactFragments}
`;

export const EDIT_CONTACT = gql`
    mutation($id: ID!, $firstName: String!, $lastName: String, $phone: String!, $email: String, $address: String) {
        editContact (id: $id, firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, address: $address) {
            ...CompleteContact
        } 
    }
    ${contactFragments}
`;

export const LIKE_OR_UNLIKE = gql`
    mutation($id: ID!) {
        addToFavourites(id: $id) {
            id
            isFavourite
        }
    }
`;

export const DELETE_CONTACT = gql`
    mutation($id: ID!) {
        deleteContact(id: $id) {
            id
        }
    }
`;
