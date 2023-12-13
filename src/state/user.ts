import { signal } from "@preact/signals-react";

const userId = signal('');

const updateUser = (id: string) => {
    userId.value = id;
    console.log('UserStore: userId updated to ' + id);
}

const accessToken = signal('');

const updateAccessToken = (token: string) => {
    accessToken.value = token;
    console.log('UserStore: accessToken updated to ' + token);
}

const AuthStore = {
    userId,
    updateUser,
    accessToken,
    updateAccessToken
}

export default AuthStore;