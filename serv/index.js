import { Server } from "socket.io";
import dotenv from 'dotenv/config'
import cors from 'cors'

const PORT=process.env.PORT||5050
const io = new Server(PORT,{cors: {
    origin: "*",
      
}});


io.on("connection", (socket) => {
  var socketID=socket.id
  console.log(socketID)
  socket.emit('userConnected',{socketID})
  socket.on('sendMsg',(id,userId,text,chatId)=>{    
      if(!chatId){
        //console.log('msg func 1')
        /*socket.broadcast.emit('getMsg',{
          id,
          userId,
          chatId,
          text
        })*/
      }else{
        console.log({id,userId,text,chatId})
        console.log(`msg func2`)
        socket.to(chatId).emit('getMsg',{
          id,
          userId,
          chatId,
          text
        })
      }
    });
    socket.on('joinRoom',(room)=>{
        //console.log(`room id:${room}`)
        socket.join(room)
        console.log(room)
        io.to(socket.id).emit('activeRoom',room)
      })
    
      socket.on('startedWriting',(username,roomId,userId)=>{
       socket.to(roomId).emit('recieveNewWriters',username,userId)
      })
    
      socket.on('stoppedWriting',(username,roomId,userId)=>{
        socket.to(roomId).emit('recieveCanceledWriters',username,userId)
      })
});



