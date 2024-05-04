import './App.css';
import './style.css';
import fisher from './img/fisher.jpg';
// import { useState } from 'react';

function App() {
  // const [inputs, setInputs] = useState({});
  return (
    <div className="grid justify-items-left items-center grid-cols-2  bg-white gap-20" >
      <div className='grid justify-items-start'>
        <div className='py-24 px-16'>
          <h1 className='text-primary text-5xl font-bold mb-4'>Sign In</h1><br/>
          
          {/* Form */}
          <form  className='grid justify-items-stretch'>
            <div className='space-y-2'>
              <label for="email" className='text-xl mb-8'>Email</label><br/>
              <input className='border-2 p-4 w-full rounded-md border-fa bg-fa focus:outline-primary ' type='email' name = "email" placeholder='example@gmail.com'></input><br/><br/>
            </div>
            
            <div className='space-y-2'>
            <label for="pwd" className='text-xl mb-8'>Password</label><br/>
            <input className='border-2 p-4 w-full rounded-md border-fa bg-fa focus:outline-primary' type='password' name = "pwd" placeholder='Enter your password'></input><br/>
            </div><br/>

            <input type='submit' className='mt-4 py-4 px-64 rounded-md border-fa bg-primary text-white text-xl font-bold'/>
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
