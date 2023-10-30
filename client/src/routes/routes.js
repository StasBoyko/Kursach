import { Login, Main } from "../pages";

export const AuthRoutes=[
    {path:'/',component:Main},
    {path:'/login',component:Login}
]

export const PublicRoutes=[
    {path:'/login',component:Login},
]