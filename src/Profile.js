


import Menubar from "./Menubar"
import  RecruiterProfile from "./recruiterProfile"
import CandidateProfile from "./candidateProfile"
import { decodeToken} from "react-jwt"
function Profile(){
    const token = localStorage.getItem("clone")
    const myDecodedToken = decodeToken(token);
    console.log(myDecodedToken.user.recruiter)
    
    console.log(myDecodedToken)
    return(
        <>
         <Menubar/>
         { myDecodedToken.user.recruiter?<RecruiterProfile/>:<CandidateProfile/>}
         
        
        </>
    )
}

export default Profile
