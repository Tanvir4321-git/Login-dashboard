import { createBrowserRouter } from "react-router";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
 

   
     {
        path:'/',
        Component: Login
     },
     {
      path:'/dashboard',
      element:<PrivateRoute>
         <Dashboard></Dashboard>
      </PrivateRoute> 
     }

])