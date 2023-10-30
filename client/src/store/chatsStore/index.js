import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useChatsStore = create(persist((set, get) => ({
        chats: [
            {
              id:1,
              userId:2,
              adminId:1
            },
            {
              id:2,
              userId:3,
              adminId:1
            }
        ],
        addChat: (chat) => set(
            (state)=>({
                chats:[...state.chats,chat]
            })
        ),
    }),
    {
      name: 'chat-storage', // name of the item in the storage (must be unique)
      version: 1, // (optional) by default, 'localStorage' is used
    }
  )
)