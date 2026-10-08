'use client'

import { useState } from 'react'
import { studyData } from '@/data/studyData'
import type { Studymode, AiResponse } from '@/types/study'
import styles from './page.module.scss'

/*프론트(html. react)*프론트에서 유저에게 입력자료를 받아서(데이터를 받아서)
ID랑 비밀번호, 질문(AI일때 )가 뭔지, 서버에게 전송(로컬)서버끼리 정보를 주고받아야 하기 때문에)::내 서버에게 전송
로컬 서버가 openai에게 자료를 전송하고 응답을 받음->
로컬서버가 프론트에게 받은 응답을 다시 전송해준다. 
openai->데이터(질문)*/

import React from 'react'

const StudyPage = () => {
    const [mode, setMode]=useState<Studymode>('explain');
    const [message, setMessage]=useState('')
    const [answer, setAnswer]=useState('')
    const [loading, setLoading]=useState(false)

    const funcquiz=async()=>{
        if(!message.trim()){
            return
        }

        try{
            setLoading(true)
            setAnswer('')
            const res=await fetch("/api/ai",{
                method:"POST",
                headers:{"Content-Type":"application/json",},
                body: JSON.stringify({
                    message,
                    mode,

                })
            })
            if(!res.ok){
                throw new Error("AI요청을 실패했습니다")
            }

            const data:AiResponse=await res.json()
            setAnswer(data.answer);

        }catch{
            setAnswer('AI답변을 가져오지 못했습니다');
        }finally{
            setLoading(false)
        }
    }
  return (
    <main className={styles.inner}>
       <div className={styles.title}>
            <p>Open Ai API활용</p>
            <h1>React학습</h1>
            <span>학습 방식을 선택하고 질문을 입력하세요</span>
       </div>
    <h2 className={styles.h2}>학습방법</h2>
       <section className={styles.innersection1}>
        
        {
            studyData.map((item)=>(
                <button className={`${styles.btnBox} ${mode === item.mode ? styles.active : ""}`} key={item.id} onClick={()=>setMode(item.mode)} >
                    <strong className={styles.subname}>{item.title}</strong>
                    <p>{item.description}</p>
                </button>
            ))
        }
        
       </section>
       <div className={styles.innersection2}>
            <label htmlFor='message'>질문</label>
            <textarea id='message' placeholder='예시: useState를 쉽게 설명해줘'
            value={message} onChange={(e)=>setMessage(e.target.value)} />
            <button onClick={funcquiz} disabled={loading} className={`${styles.button} ${loading ? styles.loading : ""}`}>
               {loading ? "답변 생성 중 입니다":"질문하기" }
                </button>
        </div>
       {
        answer && (
            <section className={styles.answerBox}>
                <h2>ai답변</h2>
                <p>{answer}</p>
            </section>
        )
       }
    </main>
  )
}

export default StudyPage
