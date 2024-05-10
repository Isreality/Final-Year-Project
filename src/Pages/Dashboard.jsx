// import { Link } from "react-router-dom";
import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";


const Dashboard = () => {
    return ( 
        <div>
          <div className="flex flex-row">
            
            {/* Sidebar */}
            <div>
              <Sidebar/>
            </div>

            {/* Body */}
            <div className="w-full">
              <div className="mb-4"><Header title="Dashboard"/></div>
              
              <div className="px-8">
                <div><Heading title="Dashboard"/></div>
              </div>
              
            </div>

          </div>
         
           
        </div>
     );
}
 
export default Dashboard;
