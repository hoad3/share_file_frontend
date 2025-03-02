import {createBrowserRouter} from "react-router-dom";
import App from "../App";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import PageLogin from "../Login/PageLogin";
import PageShare from "../Pageshare/PageShare";
export const router = createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        children:  [

            {
                index: true,
                element:<PageLogin/>
            },
            {
                path:"/sharefile/:userid",
                element:<PageShare/>
            }

        ]
    }
])


//
// export default AppRoutes;