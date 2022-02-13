
import { Box, Typography } from '@mui/material'
import {useState,useEffect,useCallback} from "react"
import {decodeToken,isExpired} from "react-jwt"
import { useHistory,Link } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from "@mui/icons-material/Home"
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Menubar() {
    const [state, setState] = useState({
        top: false,
        
    });
    const navigate=useHistory()
    const token = localStorage.getItem("clone")
    const [users, setUsers] = useState({});
   
    const getUser =useCallback( () => {
        if (token) {
            const myDecodedToken = decodeToken(token);
            const isMyTokenExpired = isExpired(token);
            console.log(myDecodedToken)
            console.log(isMyTokenExpired)
            if (!isMyTokenExpired) {
                setUsers(myDecodedToken.user)
            }
            else{
                navigate.push("/login")
            }
            
        }
        else{
            navigate.push("/login")
        }
    },[token,navigate])
    useEffect(() => {
        getUser()
    }, [getUser])
console.log(users)
const logout = () => {

    if (localStorage.getItem("clone")) {
        localStorage.removeItem("clone")
        navigate.push("/login")

    } else {
        navigate.push("/login")
   }
}
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                
                    <ListItem button component={Link} to="/profile" >
                        <ListItemIcon>
                           <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={users.name}  />
                    </ListItem>
                    <Divider />
                    <ListItem button  component={Link} to="/">
                        <ListItemIcon>
                          <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"}  />
                    </ListItem>
                    {users.recruiter?<ListItem button component={Link} to="/postJobs"  >
                        <ListItemIcon>
                           <PostAddIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Post Jobs"} />
                    </ListItem>:""}
                    
                    
                    <ListItem button onClick={logout}>
                        <ListItemIcon>
                           <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary={ isExpired(token) && localStorage.getItem("clone") ? "logout" : "login"} />
                    </ListItem>
                    
                  
              
            </List>
            
            
        </Box>
    );
    return (
        <div>
            <Box sx={{ bgcolor: "blue", height: 50, display: "flex", alignItems: "center", }}>
                
                   
                       
                            <Button onClick={toggleDrawer("left", true)}><MenuIcon sx={{color:"White"}}/></Button>
                            <Drawer
                                anchor={"left"}
                                open={state["left"]}
                                onClose={toggleDrawer("left", false)}
                            >
                                {list("left")}
                            </Drawer>
                       
                    
                

                <Typography sx={{ color: "white", fontWeight: "bold", fontSize: 24, flexGrow: 1 }} >Job portal</Typography>



            </Box>


        </div>

    )

}
export default Menubar