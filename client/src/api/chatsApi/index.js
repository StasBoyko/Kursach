class chatsApi{
     getChatByUserId(id,chats){
        try{
            const chat=chats.filter((p)=>{
                if(p.userId==id){
                    return p
                }
            })
            console.log(chat)
            return chat[0]
        }catch(e){
            console.log(e)
        }
    }
}

export default new chatsApi()

/* over here i created func to sort out chats there exists user with specified id*/