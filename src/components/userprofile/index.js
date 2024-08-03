



import {Component} from "react"

import {Link,Redirect} from "react-router-dom"


import Cookies from "js-cookie"

import Lottie from "react-lottie";

import sessions from "../animations/sessions.json";



import "./index.css"

const conditonSessions={
    status:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    loading:"LOADING"
}

class Profile extends Component {

    state={session:[],statusSession:conditonSessions.status}

    componentDidMount() {

        this.fetchAllSession()

    }

    fetchAllSession=async()=>{

        const url="https://clawenterprisesbackendtododaveed.onrender.com/sessions"
        
         this.setState({statusSession:conditonSessions.loading})
        const response=await fetch(url)
        if(response.ok){
            const responseToJson=await response.json()
            console.log("response",responseToJson)
            this.setState({session:responseToJson,statusSession:conditonSessions.success})

        }else{
            console.log("Error fetching all sessions")
            this.setState({statusSession:conditonSessions.failure})

        }


    }





    logoutUser=async()=>{

        const userData=JSON.parse(localStorage.getItem("user"));
        console.log("usersData",userData.id)

        const url="https://clawenterprisesbackendtododaveed.onrender.com/loginSession"


        const data={
            user_id:userData.id,
            login_time:localStorage.getItem("loginTime"),
            logout_time:new Date().toString()
        }
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }

        const response=await fetch(url,options)
        if(response.ok){
            console.log("Logout successful")
        Cookies.remove("jwtToken")
        localStorage.removeItem("user")
        localStorage.removeItem("loginTime")
        this.props.history.push("/login")
        }else{
            console.log("Logout failed")
        }





    }

    
loadingSessions=()=>
    <div className="animation-for-loading">
        <Lottie options={{ animationData: sessions, loop: true, autoplay: true }} height={200} width={200} />
       
    </div> 

gettingAllSession=()=>{
    const {session}=this.state

   return (<div className="time-spend-spent-container">
             
    {
      session.length>0?
      <div className="session-container">
          {
              session.map((session,index)=>(
                  <div className="session" key={session.id}>
                      <p>id:{session.id}</p>
                      <p>Start time: {session.login_time}</p>
                      <p>End time: {session.logout_time}</p>
                   <hr/>
                  </div>
              ))
          }
      </div>
      :
      <div className="no-session-container">
          <h3>No sessions yet</h3>
      </div>
    }

  </div>)

}

    timeSpent = ()=>{

        const {statusSession} = this.state 

        switch(statusSession){
            case conditonSessions.loading:
                return this.loadingSessions()
            case conditonSessions.success:
                return this.gettingAllSession()
            case conditonSessions.failure:
                return "Failed to fetch sessions"
            default:
                return "No sessions found"
            
        }


    }



    render(){
      
        const jwtToken = Cookies.get("jwtToken")
        const {username}=JSON.parse(localStorage.getItem("user"))
        if(jwtToken===undefined){
            return(
                <Redirect to="/login" />
            )
        }
        return(
            <div>

                <div className="profile-card">

                <div className="profile-container">
                <h1>Profile</h1>
                <h2 className="welcome-to-profile">Welcome, <span className="users-name">{username}! </span></h2>

                <h3>Go to Homepage   </h3>
                <Link to ="/">
                
                <button className="home-profile-button" type="button">Home</button>
                </Link>

                <h3>or</h3>
                <button className="user-logout-button" onClick={this.logoutUser} type="button">Logout</button>
                 </div>

                </div>


            <hr/>



          
            {
                this.timeSpent()
            }




            </div>
        )
    }
}

export default Profile;