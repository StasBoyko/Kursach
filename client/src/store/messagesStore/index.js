import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useMessagesStore = create(persist((set, get) => ({
        messages: [
            /*{
              id:1,
              chatId:1,
              text:'12345texttes34545t',
              userId:1
            },
            {
              id:2,
              chatId:33,
              text:'12345texttest',
              userId:2
            }*/
        ],
        addMessage: (message) => {
          set(
            (state)=>({
                messages:[...state.messages,message]
            })
          )
        },
}),{name: 'message-storage', version:1 }))