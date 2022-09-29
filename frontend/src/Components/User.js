const User = (props) => {
    return (<div className='col-4'>
        <div className='card'>
            <div className='card-body'>
                <h6 className='text-center'> {props.user.username.toUpperCase()}</h6>
            </div>
        </div>
    </div>)
}

export default User;