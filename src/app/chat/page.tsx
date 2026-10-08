'use client'
import {Suspense, useState, useEffect, useRef, useSyncExternalStore} from 'react'
import { useSearchParams } from 'next/navigation'

import Cube from '../components/Cube'
import styles from './page.module.scss'


type ChatMessage ={
  name: string
  message: string
}
const subscribeToStoredName = () => () => {}

const ChatContent = () => {
  const searchParams= useSearchParams()
  const socialName=searchParams.get("name") ?? ''
  const storedName=useSyncExternalStore(
    subscribeToStoredName,
    ()=>localStorage.getItem("name") ?? '',
    ()=>''
  )
  const name=socialName || storedName
  const [message, setMessage]=useState('')
  const [messages, setMessages]=useState<ChatMessage[]>([])  //문자의 쌓이는 것은 배열로 기억해야 함
  const socketRef= useRef<WebSocket | null>(null) //useRef(null)만 적어도 되는데 타입스크립트라서 들어갈 수 있는 경우의 수를 다 넣음
  //WebSocket은 브라우저 기본 기능이고, import하지 않아도 사용가능하다, socketRef는 (변수는) 웹소켓 실제 웹소켓 연결을 위한 임의의 변수이다.
  //웹소켓 연결을 위한 보관함이다.

  // const sendMessage=()=>{

  // }


  //로그인 사용자 이름 가죠오기
  useEffect(()=>{
    //소셜 로그인 방식 이름 가져오기
      if(socialName){
        localStorage.setItem("name", socialName)
      }
  },[socialName])

  //웹소켓 서버 연결----------------------------------------------------------------------
  useEffect(()=>{
    //이미 존재하는 (express에서 만들고 선포가 된) WebSocket 서버에 접속을 해라 라는 의미
    const socketUrl=process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:4000'
    const socket =new WebSocket(socketUrl)
    socketRef.current=socket
    socket.onopen=()=>{
      console.log('채팅서버연결 성공')
    }

    //실시간 메시지 받기
    socket.onmessage=(e)=>{
      const data:ChatMessage=JSON.parse(e.data)
      setMessages((items)=>[...items, data])
    }

    //연결 종료 방법은 
    socket.onclose=()=>{
      console.log('채팅서버종료')
    }

    return ()=>{
      socket.close();
    }
  },[])

   //실시간 메세지 보내기; useEffect안에 들어가는거 아님
  const sendMessage=()=>{
    if(!name.trim()){
      return
    }

    if(!message.trim()){
      return
    }
    if(socketRef.current?.readyState !== WebSocket.OPEN){
      return
    }

    const data:ChatMessage={
      name:name,
      message:message
    }
    socketRef.current?.send(
      JSON.stringify(data)
    )

    setMessage('')
  }
  
  return (
    
    <main className={styles.main}>
      <div className={styles.title}>
        <p>websocket chat</p>
        <h1>실시간 채팅</h1>
      </div>

      <Cube />

      <section className={styles.chatCard}>
        <div className={styles.userInfo}>
          접속 사용자: <strong>{name || '로그인 필요'}</strong>

        </div>
        {/* 실시간 채팅 메세지 */}

        {
          messages.map((item, index)=>(
            <div className={styles.message} key={`${item.name}-${index}`}>
              <strong>{item.name}</strong>
              <p>{item.message}</p>
            </div>
          ))
        }

        {/* 나의 메세지 입력 부분 구현 */}
        <div className={styles.messageForm}>
          <input type="text" placeholder='메세지를 입력하세요' value={message} onChange={(e)=>setMessage(e.target.value)} onKeyDown={(e)=>{
            if(e.key==="Enter"){sendMessage()}
          }} />

          <button onClick={sendMessage}>전송</button>
        </div>
      </section>
    </main>
  )
}

const ChatPage = () => (
  <Suspense fallback={<main className={styles.main}>채팅을 불러오는 중입니다.</main>}>
    <ChatContent />
  </Suspense>
)

export default ChatPage
