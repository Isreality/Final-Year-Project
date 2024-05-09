import { useState, useEffect } from 'react';
import '../App.css';
import '../style.css';
import fisher from '../img/fisher.jpg';
import cancel from '../icons/cancel.svg';
import success from '../icons/success.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import Dashboard from '../Pages/Dashboard';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function Modal({ message, type, onClose }) {
  const modalClasses = `relative top-0 left-0 right-0 p-4 font-medium text-left z-50 ${type === 'success' ? 'bg-success2 text-success' : 'bg-red2 text-red'}`;
  const iconSrc = type === 'success' ? success : cancel;
  const iconColor = type === 'success' ? 'bg-success' : 'bg-red';

  return (
    <div className={modalClasses}>
      <div className='flex flex-row gap-10'>
        <img src={iconSrc} alt="" className={`p-4 absolute left-0 top-0 rounded-md ${iconColor}`}/>        
        <div className='ml-12'>{message}</div> 
      </div>

      <button style={{ marginLeft: '470px', top: '10px'}} onClick={onClose} className='absolute text-black2 top-50 left-20 font-normal'>
          X</button>
    </div>
          
  );
}


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrorMessage] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [data, setData] = useState(null);
  // const navigate = useNavigate();
  // const history = createBrowserHistory();
  const BASE_URL = 'https://e9d9-102-89-23-53.ngrok-free.app/api/admin/signi-in';
  const endpoint = '/admin/sign-in';

useEffect(() => {
     setErrorMessage('');
      // setEmailError('');
      // setPasswordError('');
//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${{BASE_URL}}/admin/sign-in`, {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();
//       console.warn(data);
//       console.warn(JSON.stringify(data[2].fullname));
//       localStorage.setItem('auth', JSON.stringify(data[2].fullname));
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
}, []);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Check if email and password are empty  
    if (email.trim() === '' && password.trim() === ''){
        setErrorMessage('Email and password are required.');
        setSuccessMessage('');
        setIsModalOpen(true);
      return;
      } else if (email.trim() === '') {
        setErrorMessage('Email is required.');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
      } else if(password.trim() === '') {
        setErrorMessage('Password is required.');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
      } 
      // else {
      //   setSuccessMessage('Sign-in successful.');
      //   setTimeout(() => {
      //   setIsModalOpen(true);
        // navigate('../Pages/Dashboard.jsx');
        // window.location.href = './Dashboard'; 
      //   }, 1000);
      // }

    // Check if email is in a valid format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage('Email is invalid.');
      setSuccessMessage('');
      setIsModalOpen(true);
      return;
    }

    // Check if email and password are not given correct inputs
    // if (email !== 'agbajeisrael01@gmail.com' && password !== 'Oluwadante01') {
    //   setErrorMessage('Your email and password are incorrect. Please try again!');
    //   setSuccessMessage('');
    //   setIsModalOpen(true);
    //   return;
    // } else if (email !== 'agbajeisrael01@gmail.com') {
    //     setErrorMessage('You inputted the wrong email. Please try again!');
    //     setSuccessMessage('');
    //     setIsModalOpen(true);
    //     return;
    // } else if (password !== 'Oluwadante01'){
    //     setErrorMessage('Incorrect Password');
    //     setSuccessMessage('');
    //     setIsModalOpen(true);
    //     return;
    // } else {
    //     setSuccessMessage('Sign-in successful.');
    //     setTimeout(() => {
    //       setIsModalOpen(true);
    //       history.push({Dashboard}); 
    //   }, 1000); 
    // }

    try {
      const response = await fetch(`${{BASE_URL}}${endpoint}`, {}, {
        // const response = await fetch(`${{BASE_URL}}/admin/sign-in`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.warn(data);
      console.warn(JSON.stringify(data));
      localStorage.setItem('auth', JSON.stringify(data));

      // navigate('../Pages/dashboard');

      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    // Perform action if inputs are correct
    console.log('Email:', email);
    console.log('Password:', password);
    setErrorMessage('');
    setSuccessMessage('Sign-in successful.');
    setIsModalOpen(true);

    // onLogin();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="grid justify-items-left items-center grid-cols-2 bg-white gap-20" >
      <div className='grid justify-items-start'>
        <div className='py-20 px-16 space-y-4'>
          {isModalOpen && (
              <Modal
                message={errors || successMessage}
                type={errors ? 
                  'error' : 
                  'success'}
                onClose={closeModal}
                className="mb-24"
              />
            )}

          <h1 className='text-primary text-left text-5xl font-black mb-2'>Sign In</h1><br/>
          {/* {data && (
            <div>
              <h3>Fetched Data:</h3>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
           */}
          {/* Form */}
          <form  className='grid justify-items-stretch text-left' onSubmit={handleSubmit}>
            <div className='space-y-2 items-start'>
              
              {/* Email */}
              <label htmlFor="email" className='text-xl text-left mb-8'>Email</label><br/>
              <input 
                className='border-2 p-4 w-full rounded-md border-fa bg-fa focus:outline-primary focus:bg-fa' 
                type='email' 
                id = "email" 
                placeholder='example@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
                />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}<br/><br/>
            </div>
            
            {/* Password */}
            <div className='space-y-2' style={{ position: 'relative' }}>
              <label htmlFor="pwd" className='text-xl text-left mb-8'>Password</label><br/>
              <input 
                className='border-2 p-4 w-full rounded-md border-fa bg-fa focus:bg-fa focus:outline-primary' 
                type= {showPassword ? 'text' : 'password'}
                id = "pwd" 
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
                />
                
                {/* Eye icon switch */}
                {showPassword ? (
                  <FaEye
                    onClick={togglePasswordVisibility}
                    size={20}
                    style={{
                      position: 'absolute',
                      top: '60%',
                      right: '30px', 
                      transform: 'translateY(-50%)', 
                      cursor: 'pointer', 
                      color: '#c4c4c4', 
                    }}
                  />
                ) : (
                  <FaEyeSlash
                    onClick={togglePasswordVisibility}
                    size={20}
                    style={{
                      position: 'absolute',
                      top: '60%',
                      right: '30px', 
                      transform: 'translateY(-50%)', 
                      cursor: 'pointer', 
                      color: '#c4c4c4', 
                    }}
                  />
                )}
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}<br/>
            </div><br/>
            
            {/* Submit Button */}
            <input
            onClick = {handleSubmit} 
            type='submit' 
            value="Sign In" 
            className='mt-4 py-4 px-64 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-xl font-bold'
            />
          </form>
        </div>
      </div>
      
      {/* Image */}
      <div className='grid justify-items-start bg-fixed' >
        <img src={fisher} alt="fisher"/>
      </div>
 
    </div>
  );
}

export default Login;
