const User = (props) => {
    const { name, surname, email, address, orders, uid } = props;
    return (
        <div>
            <div>
                {uid}
            </div>
            <div>
                {name}
            </div>
            <div>
                {surname}
            </div>
            <div>
                {email}
            </div>
            <div>
                {address}
            </div>
            <div>
                {orders}
            </div>

        </div>
    )
}
export default User