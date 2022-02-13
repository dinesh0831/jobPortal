
import Menubar from "./Menubar"
import RecruiterHome from "./recruiterhome"
import CandidateHome from "./candidatehome"
import { decodeToken,isExpired } from "react-jwt"

import {useEffect,useState,useCallback} from "react"
function Homepage(){
    
    const token = localStorage.getItem("clone")
   
    const [data, setData] = useState({});
    const getPosts =useCallback( async () => {
        if (token) {
            const myDecodedToken = decodeToken(token);
            const isMyTokenExpired = isExpired(token);
            console.log(myDecodedToken)
            console.log(isMyTokenExpired)
            if (!isMyTokenExpired) {
               
                setData(myDecodedToken.user)
            }
            else{
                window.location.href="/login"
            }
            
        }
        else{
            window.location.href="/login"
        }
    },[token])
    useEffect(() => {
        getPosts()
    }, [getPosts])
    console.log(data)
   
    return(
        <>
         <Menubar/>
         
          {data.recruiter ? <RecruiterHome/>:<CandidateHome/>}
        </>
    )
}

export default Homepage