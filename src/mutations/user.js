import { gql } from 'apollo-boost';
import { userFragment } from '../fragments/user';

export const EDIT_USER = gql`
    mutation($fullName: String!, $email: String!) {
        editUser(fullName: $fullName, email: $email) {
            ...CompleteUser
        }
    }
    ${userFragment}
`;
