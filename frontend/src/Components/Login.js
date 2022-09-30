import { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import Posts from "./Posts";

const USER_LOGIN = gql`
    mutation UerLogin($email:String!, $password:String!){
        userLogin(data:{
            email:$email
            password:$password
        }){
            token
        }
    }
`

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showPost, setShowPost] = useState(false)

    const [userLogin] = useMutation(USER_LOGIN, {
        variables: {
            email,
            password
        }
    })

    const loginClickHandler = async (event) => {
        event.preventDefault();
        try {
            const { data } = await userLogin()
            localStorage.clear()
            localStorage.setItem("token", data.userLogin.token)
            setShowPost(true)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <form onSubmit={loginClickHandler}>
                {/* email */}
                <label>Email : </label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                {/* password */}
                <label>Password :</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                {/* Button */}
                <button type="submit">Login</button>
            </form>
            <br />
            {showPost && <Posts />}
        </div>
    )
}

export default Login;