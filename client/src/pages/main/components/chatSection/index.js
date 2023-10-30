import {useEffect, useState} from 'react'
import './chatSection.css'
import messagesApi from '../../../../api/messagesApi'
import { useChatsStore, useMessagesStore, useUserStore } from '../../../../store'
import { ChatIcon } from './chatIcon'
import { MessagesList } from './messagesList'
import { MessageInput } from './MessageInput'
import { io } from 'socket.io-client'
import chatsApi from '../../../../api/chatsApi'
//import chatsApi from '../../../../api/chatsApi'

//import socket from '../../../../socket'



export const ChatSection=()=>{
    const socket = io('http://localhost:5000');
    const {user}=useUserStore()
    const {messages,addMessage}=useMessagesStore()
    const {chats,addChat}=useChatsStore()

    const [activeChatId,setActiveChatId]=useState(0)
    const [sortedMessages,setSortedMessages]=useState([])
    const [lastRecievedMessage,setLastRecievedMessage]=useState({})
    const [activeUserData,setActiveUserData]=useState({})



    useEffect(()=>{
        
        messagesApi.getMessagesByChatId(activeChatId,messages,setSortedMessages)
        if(!user.isAdmin){
            const chat= chatsApi.getChatByUserId(user.id,chats)
            console.log(chat,'-chat')
            if(chat==undefined){
                console.log('no chat')
                const id=Date.now()
                addChat({id:id,userId:user.id,adminId:1})
                console.log({id:id,userId:user.id,adminId:1})
                setActiveChatId(id)
            }else{
                console.log('chat exists')
                setActiveChatId(chat.id)
            }
        }
        socket.emit('connetion')
        alert('connected')
    },[])

    useEffect(()=>{
        messagesApi.getMessagesByChatId(activeChatId,messages,setSortedMessages)
        socket.emit('joinRoom',activeChatId)
    },[activeChatId])

   
    socket.on('getMsg', ({ id, userId, chatId, text }) => {
        console.log('recieved msg')
        if(lastRecievedMessage!={ id, userId, chatId, text }){
            addMessage({ id, userId, chatId, text }); //add to db
            setSortedMessages((prev) => [
                ...prev,
                { id, userId, chatId, text },
            ]);
        }
    });
    


    return(
        <div className="chat-section">
            <div className="chat_row">
                <div className="chat-users-column">
                    <div className="chat-users-column_title">
                        chat feed
                    </div>
                    {user.isAdmin?
                        <div className='chat-users-column_scroll'>
                            {chats.map((chat)=>
                            <ChatIcon setActiveUserData={setActiveUserData} key={chat.id} setActiveChat={setActiveChatId} props={chat}/>
                            )}
                        </div>
                    :
                        <></>
                    }
                </div>
                <div className="chat-messages-column">
                    <div className="chat-messages-column_title">
                        {activeUserData.username} {activeChatId}
                    </div>
                    <div className="chat-messages-feed">
                        <MessagesList sortedMessages={sortedMessages}/>
                    </div>
                    <div className="chat-messages-column_form">
                        <MessageInput 
                            sortedMessages={sortedMessages}
                            setSortedMessages={setSortedMessages}
                            activeChatId={activeChatId}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}