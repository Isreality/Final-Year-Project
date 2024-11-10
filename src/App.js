import './App.css';
import './style.css';
import Login from './Pages/Login'
// import LoginNav from './Pages/LoginNav'
import Dashboard from './Pages/Dashboard';
import OrderList from './Pages/OrderList';
import StaffAdmins from './Pages/StaffAdmins';
import Sellers from './Pages/Sellers';
import Users from './Pages/Users';
import Category from './Pages/Category';
import ManageProducts from './Pages/ManageProducts';
import Association from './Pages/Association';
import PushNotification from './Pages/PushNotification';
import Reviews from './Pages/Reviews';
import Settings from './Pages/settings/Settings';
import SettingRoutes from './Pages/settings/SettingRoutes';
import ProtectedRoute from './Components/ProtectedRoute';
// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';


function App() {
  // const [isSuperAdminOrOwner, setIsSuperAdminOrOwner] = useState(false);

  // useEffect(() => {
  //   const adminData = JSON.parse(sessionStorage.getItem('data'));
  //   if (adminData?.access) {
  //     const { super_admin, owner } = adminData.access;
  //     setIsSuperAdminOrOwner(super_admin === 1 || owner === 1);
  //   }
  // }, []);

  // const adminData = JSON.parse(sessionStorage.getItem('data'))?.data[0];
  // const adminData = JSON.parse(sessionStorage.getItem('data')).access;

  // Function to check if the user has access to Staff Admin
  // const hasAccessToStaffAdmin = () => {
  //   return adminData?.access?.super_admin === 1 || adminData?.access?.owner === 1;
  // };

  return (   
    <div className="App" >
      <SkeletonTheme baseColor='#202020' highlightColor='#444'>
        <BrowserRouter>
          {/* <Link to='/Dashboard'>Dashboard</Link> */}
          <Routes>
            {/* <Route path="./Pages/Dashboard" Component={<LoginNav cmd={Dashboard}/>}></Route> */}
            <Route index path="/" Component={Login}></Route>
            <Route exact path="/dashboard" Component={Dashboard}></Route>
            <Route exact path="/orders" Component={OrderList}></Route>
            {/* <Route path="/staffadmins" Component={StaffAdmins}></Route> */}
             {/* Protect the Dashboard route */}
            <Route
              path="/staffadmins"
              element={
                <ProtectedRoute>
                  <StaffAdmins />
                </ProtectedRoute>
              }
            />

            {/* {(adminData?.access?.super_admin === 1 || adminData?.access?.owner === 1) ? (
              <Route path="/staffadmins" Component={StaffAdmins}></Route>
            ) : (
              <Route path="/staffadmins" element={<Navigate to="/" replace />} />
            )} */}
            <Route path="/users" Component={Users}></Route>
            <Route path="/category" Component={Category}></Route>
            <Route path="/products" Component={ManageProducts}></Route>
            <Route path="/association" Component={Association}></Route>
            <Route path="/becomeaseller" Component={Sellers}></Route>
            {/* <Route path="/PushNotification" Component={PushNotification}></Route> */}
            <Route path="/reviews" Component={Reviews}></Route>
            <Route path="settings" element={<Settings />} />
            <Route path="settings/*" element={<SettingRoutes />} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
  
      {/* <Login/> */}
 
    </div>
  );
}

export default App;
