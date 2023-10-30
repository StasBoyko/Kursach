import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes, PublicRoutes } from "../../routes/routes"
import { Header } from "../header"


export const AuthLayout=({isAuth})=>{
    return(
        <BrowserRouter>
        {isAuth?
                <div className="wrapper">
                    <Header/>
                    <div className="main">
                        <div className="container">
                            <Routes>
                                {AuthRoutes.map(route=>
                                    <Route key={route.path} Component={route.component} path={route.path}/>    
                                )}
                            </Routes>
                        </div>
                    </div>
                    <div className="footer">
                        footer
                    </div>
                </div>
            :
                <div  className="wrapper">
                    <Header/>
                    <div className="main">
                        <div className="container">
                            <Navigate to='/login'/>
                            <Routes>
                                <Route  path="/login" Component={PublicRoutes[0].component}/>
                            </Routes>
                        </div>
                    </div>
                    <div className="footer">
                        footer
                    </div>
                </div>
                }
        </BrowserRouter>
    )
}