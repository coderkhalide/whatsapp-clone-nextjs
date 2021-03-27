import styled from 'styled-components'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicNoneIcon from '@material-ui/icons/MicNone';
import { useState } from 'react'
import firebase from 'firebase'
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react'
import { useRef } from 'react'
import { useEffect } from 'react'


function ChatScreen({chat, messages, recipientSnapshot, recipient}) {
    const [input, setInput] = useState('')
    const [user] = useAuthState(auth)
    const router = useRouter()
    const endOfMessageRef = useRef(null)

    const scrollToBottom = () => {
        if(endOfMessageRef.current){
            endOfMessageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    const [messagesSnapshot] = useCollection(
        db
            .collection('chats')
            .doc(router.query.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
    )

    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(msg => {
                scrollToBottom()
                return <Message  
                    key={msg.id} 
                    user={msg.data().user}
                    message={{
                        ...msg.data(),
                        timestamp: msg.data().timestamp?.toDate().getTime()
                    }}
                />
            })
        } else {
            
            return JSON.parse(messages).map(msg => {
                scrollToBottom()
                return <Message  
                    key={msg.id} 
                    user={msg.user}
                    message={msg}
                />
            })
        }
        
    }

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        })

        setInput('')
        scrollToBottom()
    }

    const recipientEmail = getRecipientEmail(chat.users, user)

    useEffect(() => scrollToBottom(), [])

    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} /> 
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar> 
                )}

                <Headerinformation>
                    {recipient ? (
                        <h3>{recipient?.name}</h3>
                    ) : (
                        <h3>{recipientEmail}</h3>
                    )}
                    {recipientSnapshot ? (
                        <p>Last active: {' '}
                            {recipient?.lastSeen.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen.toDate()} />
                            ) : "Unavailable"}
                        </p>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Headerinformation>

                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef} />
            </MessageContainer>
            <InputContainer onSubmit={sendMessage}>
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" >Sent message</button>
                <IconButton>
                    <MicNoneIcon />
                </IconButton>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
    
`

const Header = styled.div`
    position: sticky;
    background-color: #fff;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 15px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`

const Headerinformation = styled.div`
    margin-left: 15px;
    flex: 1;

    > h3 {
        margin: 0;
        margin-bottom: 3px;
    }

    > p {
        font-size: 14px;
        color: gray;
        margin: 0;
    }
`

const HeaderIcons = styled.div`
    
`

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #E6DEDA;
    min-height: 90vh;
    padding-top: 95px;
`

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: #fff;
    z-index: 100;
`

const Input = styled.input`
    flex: 1;
    align-items: center;
    padding: 20px;
    position: sticky;
    bottom: 0;
    background-color: whitesmoke;
    border-radius: 10px;
    margin-left: 15px;
    margin-right: 15px;
    outline: none;
    border: none;
`   