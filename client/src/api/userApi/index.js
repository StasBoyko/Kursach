import axios from 'axios'

class userApi{
    async login(email,password,setAuth){
        try{
            const users=await axios.get('./users.json')
            const foundUser=users.data.filter((user)=>{
                if(email==user.email&&password==user.password){
                    return user
                }
            })
            console.log(foundUser)
            if(foundUser[0]){
                setAuth(foundUser[0])
                localStorage.setItem('userID',foundUser[0].id)
            }else{
                throw Error('wrong email or password')
            }
        }catch(e){
            console.error(e)
        }
    }

    
    async rehost(setAuth){
        try{
            if(!localStorage.getItem('userID')){
                throw Error('user not found')
            }
            const users=await axios.get('./users.json')
            const foundUser=users.data.filter((user)=>{
                if(localStorage.getItem('userID')==user.id){
                    return user
                }
            })
            setAuth(foundUser[0])
        }catch(e){
            console.error(e)
        }
    }
    async getUserById(id,setState){
        try{
            const users=await axios.get('./users.json')
            const foundUser=users.data.filter((user)=>{
                if(id==user.id&&user.isAdmin==false){
                    return user
                }
            })
            setState(foundUser[0]?foundUser[0]:null)
        }catch(e){
            console.error(e)
        }
    }
}


export default new userApi()