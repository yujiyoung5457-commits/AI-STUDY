'use client'
import { type FormEvent, useState } from "react"
import styles from './page.module.scss'

const SignupPage = () => {
  const [name, setName]=useState('')
  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')

  const [message, setMessage]=useState('')

  const fncSignup=async(event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    setMessage('')

    // 세 입력값 중 하나라도 비어 있으면 서버 요청을 보내지 않습니다.
    if(!name || !username || !password){
      setMessage("입력된 값이 없습니다")
      return
    }

    try{
        // 배포 환경에서도 같은 코드를 사용할 수 있도록 공개 환경변수에서 서버 주소를 가져옵니다.
        const serverUrl=process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'
        const response=await fetch(`${serverUrl}/signup`,{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            name: name,
            username: username,
            password: password
          })
        })

        const data=await response.json()
        setMessage(data.message)

        // 서버가 성공 상태를 반환했을 때만 입력값을 초기화합니다.
        if(response.ok){
          setName('')
          setUsername('')
          setPassword('')
        }
    }catch{
      setMessage('서버연결에 실패하였습니다')
    }
  }
  return (
    <main className={styles.main}>
      <section className={styles.signupCard}>
      <h1>회원가입</h1>
      <form className={styles.form} onSubmit={fncSignup}>
        <input type="text" placeholder="닉네임을 입력하세요" value={name} onChange={(e)=>setName(e.target.value)} autoComplete="name" required/>
        <input type="text" placeholder="아이디를 입력하세요" value={username} onChange={(e)=>setUsername(e.target.value)} autoComplete="username" required/>
        <input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="new-password" required/>
        <button type="submit">회원가입</button>
        {
          message && (<p role="alert">{message}</p>)
        }
      </form>
      </section>
    </main>
  )
}

export default SignupPage
