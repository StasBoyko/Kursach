import {create} from 'zustand';


export const useUserStore = create( (set) => ({
    user:{},
    isAuth:false,
    setAuth:(user)=>{
        console.log(user)
        set((state)=>({
            ...state,user:user,isAuth:true
        }))
    },
    logout:()=>{
        localStorage.removeItem('userID')  
        set((state)=>({
            ...state,user:{},isAuth:false
        }))
    } 
}));