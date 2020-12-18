import React, { useRef, useState } from 'react';
import './Chat.css'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'animate.css'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Col, Row, Container, Button } from 'react-bootstrap'

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "hink-d1b5f.firebaseapp.com",
    projectId: "hink-d1b5f",
    storageBucket: "hink-d1b5f.appspot.com",
    messagingSenderId: "644934806055",
    appId: "1:644934806055:web:22e7fb5606f4404b1f3c02"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function ChatPage() {

    const [user] = useAuthState(auth);

    return (
        <Container className='animate__animated animate__slideInUp'>
            <Row style={{ margin: '120px 0 60px 0' }}>
                <Col>
                    <div className="App">
                        <header>
                            <h1>🔥💬</h1>
                            <SignOut />
                        </header>

                        <section>
                            {user ? <ChatRoom /> : <SignIn />}
                        </section>

                    </div>
                </Col>
            </Row>
        </Container>
    );
}

function SignIn() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <>
            <Button className="sign-in" variant='outline-light' onClick={signInWithGoogle}>Sign in with Google</Button>
        </>
    )

}

function SignOut() {
    return auth.currentUser && (
        <Button variant='outline-warning' className='sign-out' onClick={() => auth.signOut()}>Sign out</Button>
    )
}

function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (<>
        <main className='chat-list'>

            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

            <span ref={dummy}></span>

        </main>

        <form className='send-message' onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something" />

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img className='profile-pic' src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <p className='msg-text'>{text}</p>
        </div>
    </>)
}

export default ChatPage