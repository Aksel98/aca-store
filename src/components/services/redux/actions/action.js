export const LOGGED_IN = 'LOGGED_IN'

export const loggedIn = (currentUser) => {
    return {
        type: LOGGED_IN,
        currentUser
    }
}
