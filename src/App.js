import './App.css';
import './style.css';
import Login from './Pages/Login'
// import LoginNav from './Pages/LoginNav'
import Dashboard from './Pages/Dashboard';
import OrderList from './Pages/OrderList';
import StaffAdmins from './Pages/StaffAdmins';
import Vendors from './Pages/Vendors';
import Customers from './Pages/Customers';
import ManageProducts from './Pages/ManageProducts';
import PushNotification from './Pages/PushNotification';
import Reviews from './Pages/Reviews';
import Settings from './Pages/Settings';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (   
    <div className="App" >
      <Router>
        {/* <Link to='/Dashboard'>Dashboard</Link> */}
        <Routes>
          {/* <Route path="./Pages/Dashboard" Component={<LoginNav cmd={Dashboard}/>}></Route> */}
          <Route index path="/" Component={Login}></Route>
          <Route exact path="/Dashboard" Component={Dashboard}></Route>
          <Route exact path="/OrderList" Component={OrderList}></Route>
          <Route path="/StaffAdmins" Component={StaffAdmins}></Route> 
          <Route path="/Vendors" Component={Vendors}></Route>
          <Route path="/Customers" Component={Customers}></Route>
          <Route path="/ManageProducts" Component={ManageProducts}></Route>
          <Route path="/PushNotification" Component={PushNotification}></Route>
          <Route path="/Reviews" Component={Reviews}></Route>
          <Route path="/Settings" Component={Settings}></Route>
        </Routes>
      </Router>
  
      {/* <Login/> */}
 
    </div>
  );
}

export default App;
