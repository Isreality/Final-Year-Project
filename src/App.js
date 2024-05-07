import './App.css';
import './style.css';
import Login from './Pages/Login'
// import LoginNav from './Pages/LoginNav'
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (   
    <div className="App" >
      <Router>
        <Routes>
          {/* <Route path="./Pages/Dashboard" Component={<LoginNav cmd={Dashboard}/>}></Route> */}
          <Route path="./Pages/Dashboard" Component={Dashboard}></Route>
          {/* <Route exact path="/Home" Component={Home}></Route>
          <Route path="/Portfolio" Component={Portfolio}></Route>  */}
        </Routes>
      </Router>
  
      <Login/>
 
    </div>
  );
}

export default App;
