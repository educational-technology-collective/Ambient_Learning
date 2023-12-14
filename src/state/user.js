import { signal } from "@preact/signals-react";

const userId = signal('');

const updateUser = (id) => {
    userId.value = id;
    console.log('UserStore: userId updated to ' + id);
}

const accessToken = signal('');

const updateAccessToken = (token) => {
    accessToken.value = token;
}

const AuthStore = {
    userId,
    updateUser,
    accessToken,
    updateAccessToken
}

export default AuthStore;