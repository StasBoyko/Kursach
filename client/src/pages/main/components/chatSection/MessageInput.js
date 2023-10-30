import { useEffect, useState } from "react"
import { useMessagesStore, useUserStore } from "../../../../store"

import socket from "../../../../socket";

export const MessageInput=({activeChatId,setSortedMessages,sortedMessages})=>{
    
    const {user}=useUserStore()
    
    const [newMessage,setNewMessage]=useState({
        id:0,
        chatId:activeChatId,
        text:'',
        userId:user.id
    })
    const {addMessage}=useMessagesStore()


    
    const addNewMessageHandler=()=>{
        if(activeChatId!=0){
            console.log({...newMessage,id:Date.now(),chatId:activeChatId,userId:user.id},'--userid before sendin messsage')
            //addMessage({...newMessage,id:Date.now(),chatId:activeChatId,userId:user.id})
           // setSortedMessages([...sortedMessages,newMessage])
            socket.emit('sendMsg',Date.now(),user.id,newMessage.text,activeChatId)
            setNewMessage({...newMessage,text:''})
        }
        
    }

    if(activeChatId!=0) return(
        <>
            <input value={newMessage.text} onChange={(e)=>setNewMessage({...newMessage,text:e.target.value})}/>
            <button onClick={()=>addNewMessageHandler()} type="button" className="btn btn-success">send</button>
        </>
    )

}