
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Register from "./Register";

import Login from "./Login"
import Homepage from "./homepage"
import postJobs from "./postJobs"
import Profile from "./Profile"

function App() {
  return (
    <BrowserRouter>
        
    <Switch>
        <Route exact path="/" component={Homepage}/> 
        <Route exact path="/Register" component={Register}/>
   
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/postjobs" component={postJobs}/>
        <Route exact path="/profile" component={Profile}/>
   


    </Switch>
    </BrowserRouter>
  );
}

export default App;
