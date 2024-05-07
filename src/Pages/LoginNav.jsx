import { Navigate } from 'react-router-dom';

function LoginNav(props) {
    const Cmd = props.cmd;
    console.warn(localStorage.getItem('auth'));
    var auth = JSON.parse(localStorage.getItem('auth'));
    
    return(        
        <div>
           {{auth} ? <Cmd/> : <Navigate to='/'></Navigate>} 

        </div>
    )
}

export default LoginNav;
