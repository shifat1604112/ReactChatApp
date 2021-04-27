import { Avatar, IconButton  } from "@material-ui/core";
import { AttachFile, InsertEmoticon,MoreVert, SearchOutlined } from "@material-ui/icons";
import React,{useEffect,useState} from "react";
import "./Chat.css";
import  MicIcon from "@material-ui/icons/Mic";
import {useParams} from "react-router-dom"; 
import db from '../firebase';
import firebase from 'firebase';
import { useStateValue } from "./StateProvider";


function Chat () {

    const [seed,setSeed] = useState("");
    const [input,setInput] = useState("");
    const {roomId} = useParams();
    const [roomName ,setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId)
            .onSnapshot((snapshot)=>setRoomName(
                snapshot.data().name
            ));

            db.collection('rooms').doc(roomId)
            .collection("messages").orderBy("timestamp","asc")
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });    

        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*50000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault(); //refresh kre na input Feild

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput(""); ///input feild clear kre de
    }

    return(
        <div className="chat">
            <div className="Chat__header">
                  <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                   <div className="Chat_headerInfo">
                     <h3 className='chat-room-name'>{roomName}</h3>
                     <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                   </div> 
                   <div className="Chat_headerRight">
                   <IconButton>
                        <SearchOutlined/>    
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                   </div>
            </div>
            <div className="Chat__body">
                {messages.map(message => (
                    <p className={`chat_msg ${ message.name == user.displayName && 'char_rcv'}`}>
                    <span className="chat__name">{message.name}</span>
                        {message.message}
                    <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>   
                ))}
            </div>
            <div className="Chat__footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={(e)=> setInput(e.target.value)}
                    type="text" placeholder="type a message.."/>
                    <button onClick={sendMessage}
                    type="submit">Send</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    );
}

export default Chat;