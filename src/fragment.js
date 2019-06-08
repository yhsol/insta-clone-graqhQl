// FULL_POST_FRAGMENT 에서 쓰려는 값들 (USER_FRAGMENT, FILE_FRAGMENT, COMMENT_FRAGMENT) 등을 fragment 형태가 아니라
// string 형태로 만들어서 써야 작동한다.

export const USER_FRAGMENT = `
        id
        username
`;

export const FILE_FRAGMENT = `
        id
        url
`;

export const COMMENT_FRAGMENT = `
        id
        text
        user {
            ${USER_FRAGMENT}
        }
`;

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post {
        id
        location
        caption
        user {
            ${USER_FRAGMENT}
        }
        files {
            ${FILE_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
    }
`;
