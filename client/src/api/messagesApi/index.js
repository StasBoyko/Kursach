//import axios from 'axios'

class messageApi{
    async getMessagesByChatId(id,messages,setSortedMessages){
        try{
            //console.log(messages)
            const foundData= messages.filter((message)=>{
                if(message.chatId==id) {
                    return message
                }
            })  
            //console.log(foundData)
            setSortedMessages(foundData)
        }catch(e){
            console.error(e)
        }
    }
    
}

export default new messageApi()