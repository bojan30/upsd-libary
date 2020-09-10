import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from '../images/logo.png';
import { useHistory } from 'react-router-dom';

const Login = ({logUserIn, currentUser}) => {
    const history = useHistory();
    useEffect(() => {
        if (currentUser) history.push("/dashboard");
    }, [currentUser, history]);

    const [loginData, setLoginData] = useState({identifier: "", password: ""});
    const [loginError, setLoginError] = useState(null);

    const handleInput = (e) => {
        setLoginData({...loginData, [e.target.id]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //check if username and password are not empty
        if(!loginData.identifier || !loginData.password){
            setLoginError('Morate uneti korisničko ime i šifru!!!');
        }
        else{
            axios.post('https://upsd-biblioteka.herokuapp.com/auth/local', {identifier: loginData.identifier, password: loginData.password}).then(res => {
                logUserIn(res.data);
            }).catch(err => {
                setLoginError('Unesi ispravne podatke i pokušaj ponovo');
            });
        }
    }
    return (
        <form className = "form p-4">
            <div className="logo">
                <img src={logo} alt=""/>
            </div>
            <h2 className = "h3 mb-4 text-center">Uloguj se</h2>
            <div className="form-group">
                <label htmlFor="identifier">Korisničko ime</label>
                <input onChange = {handleInput} type="text" className="form-control" id="identifier" value = {loginData.identifier}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Lozinka</label>
                <input onChange = {handleInput} type="password" className="form-control" id="password" value = {loginData.password}/>
            </div>
            {loginError && <div className="alert alert-danger p-2" role="alert">
                {loginError}
            </div>}
            <button onClick = {handleSubmit} type="submit" className="btn btn-primary">Uloguj se</button>
        </form>
    );

}
export default Login;