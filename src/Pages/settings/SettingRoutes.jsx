import EditProfile from "./EditProfile";
import { Routes, Route, useMatch } from 'react-router-dom';

const SettingRoutes = () => {

    return (
        <Routes>
            <Route index path="/" />
            <Route path="editprofile" element={<EditProfile />} />
        </Routes>
    );
  };
  
  export default SettingRoutes;