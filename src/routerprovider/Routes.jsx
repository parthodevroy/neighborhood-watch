import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "../component/root/Root";
import Issues from "../component/issues/Issues";
import IssuDetails from "../component/Pages/IssuDetails";
import Register from "../component/authentication/Register";
import Login from "../component/authentication/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
        {
            path:"/issues",
            loader:()=>fetch("http://localhost:3000/issues"),
            element:<Issues></Issues>
            
        },
        {
          path:"/issues/:id",
          element:<IssuDetails></IssuDetails>
        },
        {
          path:"/register",
          element:<Register></Register>
        },
        {
          path:"/login",
          element:<Login></Login>
        }
    ]
    
  },
]);
