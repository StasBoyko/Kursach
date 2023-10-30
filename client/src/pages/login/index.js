import { useState } from 'react'
import userApi from '../../api/userApi'
import { useUserStore } from '../../store'
import './login.css'

export const Login=()=>{
    const {setAuth,isAuth,logout}=useUserStore()

    const [userData,setUserData]=useState({
        email:'',
        password:''
    })


    return(
        <div className="input-page">
            <div className="input_row">
                {isAuth?
                    <button onClick={logout} type="button" className="btn btn-danger">logout</button>
                :
                    <div className="input-placeholder">
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">email</label>
                            <input value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} type="text" className="form-control" id="formGroupExampleInput" placeholder="email"/>
                        </div>
                            <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">password</label>
                            <input value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} type="password" className="form-control" id="formGroupExampleInput2" placeholder="password"/>
                        </div>
                        <div className='input-placeholder-button'>
                            <button onClick={()=>userApi.login(userData.email,userData.password,setAuth)} type="button" className="btn btn-primary">submit</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}