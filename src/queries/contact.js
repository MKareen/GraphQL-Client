import { gql } from 'apollo-boost';
import { contactFragments } from '../fragments/contact';

export const GET_CONTACT = gql`
    query($id: ID!) {
        contact(id: $id) {
            ...CompleteContact
        }
    }
    ${contactFragments}
`;

export const SEARCH_CONTACT = gql`
    query($q: String) {
        searchContact(q: $q) {
            ...CompleteContact
        }
    }
    ${contactFragments}
`;

export const GET_USER_CONTACTS = gql`
    query {
        userContacts {
            ...CompleteContact
        }
    }
    ${contactFragments}
`;
