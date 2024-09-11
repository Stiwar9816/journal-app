export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    errorCode: null
}

export const authenticatedState = {
    status: 'authenticated',
    uid: 'ABC123',
    email: 'carlos@gmail.com',
    displayName: 'Carlos',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
    errorCode: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    errorCode: null
}

export const demoUser = {
    uid: 'ABC123',
    email: 'carlos@gmail.com',
    displayName: 'Carlos',
    photoURL: 'https://demo.jpg',
}