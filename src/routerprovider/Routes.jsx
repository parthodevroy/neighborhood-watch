import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "../component/root/Root";
import Issues from "../component/issues/Issues";
import IssuDetails from "../component/Pages/IssuDetails";
import Register from "../component/authentication/Register";
import Login from "../component/authentication/Login";
import Contributes from "../component/Pages/Contributes";
import MyContributes from "../component/Pages/MyContributes";
import PrivateRoute from "../component/privateroutes/PrivateRoutes";
import AddIssu from "../component/Pages/AddIssu";
import UpdateProfile from "../component/authentication/UpdateProfile";
import MyIssues from "../component/issues/MyIssues";
import NotFound from "../component/root/NotFound";
import PrivateRoutes from "../component/privateroutes/PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    errorElement:<NotFound></NotFound>,
    children:[
        {
            path:"/issues",
            loader:()=>fetch("https://neighborhood-watch-server.vercel.app/issues"),
            element:<Issues></Issues>
            
        },
        {
          path:"/issues/:id",
          element:
           <PrivateRoutes> <IssuDetails></IssuDetails></PrivateRoutes>
         
        },
        {
          path:"/register",
          element:<Register></Register>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/contributes/:id",
          element:<PrivateRoute>
            <Contributes></Contributes>
          </PrivateRoute>
        },
        {
          path:"mycontribution",
          element:<PrivateRoute>
            <MyContributes></MyContributes>
          </PrivateRoute>
        },
        {
          path:"/addissues",
          element:<PrivateRoute>
            <AddIssu></AddIssu>
          </PrivateRoute>
        },
        {
          path:"/updateprofile",
          element:<PrivateRoute><UpdateProfile>
            </UpdateProfile></PrivateRoute>
        },
        {
          path:"/myissues",
          element:<PrivateRoute>
            <MyIssues></MyIssues>
          </PrivateRoute>
        }
    ]
    
  },
]);
