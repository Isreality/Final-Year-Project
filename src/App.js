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
// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';


function App() {
  return (   
    <div className="App" >
      {/* <SkeletonTheme baseColor='#313131' highlightColor='#525252'> */}
      <SkeletonTheme baseColor='#202020' highlightColor='#444'>
        <BrowserRouter>
          {/* <Link to='/Dashboard'>Dashboard</Link> */}
          <Routes>
            {/* <Route path="./Pages/Dashboard" Component={<LoginNav cmd={Dashboard}/>}></Route> */}
            <Route index path="/" Component={Login}></Route>
            <Route exact path="/dashboard" Component={Dashboard}></Route>
            <Route exact path="/orderlist" Component={OrderList}></Route>
            <Route path="/staffadmins" Component={StaffAdmins}></Route> 
            <Route path="/sellers" Component={Vendors}></Route>
            <Route path="/customers" Component={Customers}></Route>
            <Route path="/manageproducts" Component={ManageProducts}></Route>
            {/* <Route path="/PushNotification" Component={PushNotification}></Route> */}
            <Route path="/reviews" Component={Reviews}></Route>
            <Route path="/settings" Component={Settings}></Route>
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
  
      {/* <Login/> */}
 
    </div>
  );
}

export default App;
