import { Avatar, IconButton } from '@material-ui/core';
import  DonutLargeIcon  from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import React,{useState,useEffect} from 'react';
import './Sidebar.css';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './firebase';

import { useStateValue } from './component/StateProvider';


function Sidebar() { 

    const [rooms,setRooms] = useState([]);
    const [{user} ,dispatch] = useStateValue();

    useEffect(() => {
       const unsub =  db.collection('rooms').onSnapshot((snapshot)=>(
            setRooms(snapshot.docs.map((doc) =>(
                {
                    id : doc.id,
                    data :doc.data(),
                }
            )))
        ));
        
        return()=>{
            unsub();
        }

    }, []);

  return (
    <div className="sidebar">
        <div className="sidebar__header">
            <Avatar src={user?.photoURL}/>
            <div className="sidebar__headerRight">
                <IconButton>
                    <DonutLargeIcon/>    
                </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>                
            </div>
        </div>
        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                <SearchOutlined/>
                <input placeholder="Search" type ="text"/>
            </div>
        </div>
        <div className="sidebar__chats">
            <SidebarChat addNewChat/>
            {rooms.map(room=>(
                <SidebarChat key={room.id} id={room.id}
                name={room.data.name}/>
            ))}
        </div>  
    </div>
  );
}

export default Sidebar;