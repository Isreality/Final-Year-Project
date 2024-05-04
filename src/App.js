import './App.css';
import './style.css';
import fisher from './img/fisher.jpg';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};

    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }

    // Validate password
    if (password.length < 8) {
      errors.password = 'Must have a minimum length of 8 characters';
    }

    setErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      // Form is invalid, do not proceed with submission
      console.log('Form contains errors');
    }
  };

  return (
    <div className="grid justify-items-left items-center grid-cols-2  bg-white gap-20" >
      <div className='grid justify-items-start'>
        <div className='py-24 px-16'>
          <h1 className='text-primary text-5xl font-bold mb-4'>Sign In</h1><br/>
          
          {/* Form */}
          <form  className='grid justify-items-stretch' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              
              {/* Email */}
              <label for="email" className='text-xl mb-8'>Email</label><br/>
              <input 
                className='border-2 p-4 w-full rounded-md border-fa bg-fa focus:outline-primary focus:bg-fa' 
                type='email' 
                name = "email" 
                placeholder='example@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}<br/><br/>
            </div>
            
            {/* Password */}
            <div className='space-y-2' style={{ position: 'relative' }}>
              <label for="pwd" className='text-xl mb-8'>Password</label><br/>
              <input 
                className='border-2 p-4 w-full rounded-md border-fa bg-fa focus:outline-primary' 
                type= {showPassword ? 'text' : 'password'}
                name = "pwd" 
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
                
                {/* Eye icon switch */}
                {showPassword ? (
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
                ) : (
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
                )}
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}<br/>
            </div><br/>
            
            {/* Submit Button */}
            <input type='submit' value="Sign In" className='mt-4 py-4 px-64 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-xl font-bold'/>
          </form>
        </div>
      </div>

      <div className='grid justify-items-start bg-fixed' >
        <img src={fisher} alt="fisher"/>
      </div>
 
    </div>
  );
}

export default App;
