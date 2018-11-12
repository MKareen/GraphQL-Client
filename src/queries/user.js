import { gql } from 'apollo-boost';
import { userFragment } from "../fragments/user";

export const GET_ALL_USERS = gql`
    query {
        usersList {
            ...completeUser
        }
    }
    ${userFragment}
`;

export const GET_CURRENT_USER = gql`
    query {
        currentUser {
            ...CompleteUser
        }
    }
    ${userFragment}
`;
