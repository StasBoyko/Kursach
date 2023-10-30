import { useEffect, useState } from "react"
import userApi from "../../../../api/userApi"


export const ChatIcon=({props,setActiveChat,setActiveUserData})=>{
    const [userData,setUserData]=useState({})
    useEffect(()=>{
        userApi.getUserById(props.userId,setUserData)
        
    },[])

    const setActicveChatHandler=(id)=>{
        setActiveChat(id)
       // console.log('set active chat id:',id)
        setActiveUserData(userData)
    }

    return(
        <div onClick={()=>setActicveChatHandler(props.id)} className="chat-users-column_user">
            <div className="chat-users-column_user-avatar"></div>
            <p>{userData.username?userData.username:'null'}</p>
        </div>
    )
}