import { Link } from "react-router-dom";

import './header.css'
import { useUserStore } from "../../store";

export const Header=()=>{
    const {isAuth,user}=useUserStore()

    return(
        <div className='header'>
            <div className="container">
                <div className='header_row'>
                    <div className='logo'>
                        {isAuth?<Link to={'/'}><p>main</p></Link>:<></>}          
                    </div>
                    <div className='links'>
                        <Link to={'/login'}>
                            <p>{isAuth?user.username:'login'}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}