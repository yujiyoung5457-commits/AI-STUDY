'use client'

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import type { LoginResponse } from "@/types/auth"
import styles from './page.module.scss'

const LoginPage = () => {
  const router=useRouter()
  const serverUrl=process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')
  const [message, setMessage]=useState('')

  const fncLogin =async(event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    setMessage('')

    try{
      const response= await fetch(`${serverUrl}/login`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      const data:LoginResponse=await response.json()
      if(!response.ok){
        setMessage(data.message)
        return
      }

      if(data.user){
        localStorage.setItem("name",data.user.name)
      }
      router.push('/chat')

    }catch{
       setMessage('서버에 연결할 수 없습니다')
    }
  }


  return (
    <main className={styles.main}>
      <section className={styles.loginCard}>
        <h1>로그인</h1>

        <form className={styles.form} onSubmit={fncLogin}>
          <input type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="아이디를 입력하세요" value={username} autoComplete="username" required/>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="비밀번호를 입력하세요" value={password} autoComplete="current-password" required/>
          <button type="submit">로그인</button>
          <div className={styles.socialButtons}>
            <a href={`${serverUrl}/auth/naver`}>네이버 로그인</a>
            <a href={`${serverUrl}/auth/kakao`}>카카오 로그인</a>
          </div>
          {
            message&&(<p role="alert">{message}</p>)
          }
        </form>
      </section>
    </main>
  )
}

export default LoginPage
