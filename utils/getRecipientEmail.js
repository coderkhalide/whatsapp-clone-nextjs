const getRecipientEmail = (users, userLoggedIn) => (
    users?.filter(user => user !== userLoggedIn?.email)[0]
)

export default getRecipientEmail
