import history from "./history"
import axiosInstance from "./axios";
class AuthenticationService{
    isClientLoggedIn(){
        let user = localStorage.getItem('ROLE')
        //console.log(user)
        if (user === 'client') return true
        return false
    }

    isAdminLoggedIn(){
        let user = localStorage.getItem('ROLE')
        //console.log(user)
        if (user === 'admin') return true
        return false
    }

    getClientId(){
        if(this.isClientLoggedIn()){
            let user = localStorage.getItem('USER_ID');
            return user;
        }
        return 1;
    }

    getUserId(){
        if(this.isClientLoggedIn() || this.isAdminLoggedIn()){
            let user = localStorage.getItem('USER_ID');
            return user;
        }
    }

    logout(){
        if(localStorage.getItem('ROLE') !== null){
            localStorage.removeItem('ROLE');
            localStorage.removeItem('USER_ID');
        }
        axiosInstance.post('/logout')
            .then(res=>{
                console.log(res.data)
            })
            .catch(e =>{
                console.log(e)
            })
        history.push("/login")
        window.location.reload()
    }
}
export default new AuthenticationService();