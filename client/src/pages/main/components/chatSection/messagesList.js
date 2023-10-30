import { useEffect, useState } from "react"
import { useUserStore } from "../../../../store"


const Message=({message})=>{
    const {user}=useUserStore()
    const [isMyMessage,setIsMyMessage]=useState(false)

    useEffect(()=>{
        setIsMyMessage(user.id==message.userId)
        console.log('newMessage',message)
    },[])

    return(
        <div style={{textAlign:`${isMyMessage?'right':'left'}`}} key={message.id}>
            <p>{message.text}##{JSON.stringify(`${user.id},${message.userId}`)}</p><br/>
        </div>
    )
}



export const MessagesList=({sortedMessages})=>{
    
    const [isMyMessage,setIsMyMessage]=useState(false)
   

    return(
        <>
            {sortedMessages.map(message=>
                <Message key={message.id} message={message}/>
            )}
        </>
    )
}
