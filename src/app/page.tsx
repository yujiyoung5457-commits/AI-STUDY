import React from 'react'
import { studyData } from '@/data/studyData'
import StudyCard from './components/StudyCard'
import Link from 'next/link'
import styles from './page.module.scss'


const Homepage = () => {
  return (
    <main className={styles.inner}>
      <section className={styles.mainTT}>
        <p>Next project</p>
        <h1>Next기반 AI활용<br />React.js학습 사이트</h1>
        <p>open AI 를 활용해서 React학습은 서비스 합니다</p>
      </section>
    {/* ----------------------------- */}
      <section>
        <h2>AI학습구성</h2>
        <div className={styles.boxs}>
        {  
            studyData.map((item)=>(
            <StudyCard key={item.id} item={item} />
          ))
          
          }
        </div>

       
      </section>
       <Link href='/study' className={styles.Link1}>학습 바로가기</Link>
    {/* ----------------------------- */}

      <section className={styles.tail}>
          <div>
            <p>TailWind CSS,Open Weather API</p>
            <h2>Tailwind CSS디자인된 지역별 날씨 확인</h2>
          </div>
          
      </section>
      <Link href='/weather'className={styles.Link1}>날씨 확인 바로가기</Link>

    </main>
  )
}

export default Homepage




// "use client";


// import { useState } from 'react'
// import {studyData} from '@/data/studyData'
// import React from 'react'
// import { AiResponse, StudyMode} from '@/types/study'
// import styles from './page.module.scss'
// // import { Methods } from 'openai/resources/fine-tuning.js'
// // import { headers } from 'next/headers'

// //프론트에서 작업을 사용자에게 받고(jsx, tsx, html+파이선)->서버에게 던짐(라우터, 자바, 노드)가 오픈 ai에게 질문을 던짐--> 다시 서버가 오픈 ai에게 답변을 받음
// // 서버가 프론트에게 답변을 준다.  , 
// const StudyPage = () => {
//   const [mode, setMode]=useState<StudyMode>("explain")
//   const [message, setMessage]=useState('')
//   //ai한테 바로 질문을 보내는게 아님, 내 서버에 먼저 보내는 것임
//   const [answer, setAnswer]=useState('')
//   const [loading, setLoading]=useState(false)
//   const funque=async()=>{
//     if(!message.trim()){
//       return
//     }

//     try{
//       setLoading(true)
//       setAnswer("")
//       const response=await fetch("/api/ai/",{
//       method: "POST",
//       headers:{"Content-Type" : "application/json",},
//       body: JSON.stringify({
//         message,
//         mode,
//       })
//     })
//   }catch(error){

//     }finally{

//     }
//   }

//   return (
//     <main>
//      <div>

//      </div>

//      <div className={styles.boxs}>

//      </div>

//      <div>
//       <label htmlFor="message">질문</label>
//       <textarea id='message' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='예: useState를 쉽게 설명해줘' />
//         <button onClick={funque} disabled={loading}>{loading ? "답변생성중" : "질문하기"}</button>
//      </div>

//     <div>
//       {answer && (
//          <div>
//             <h2>ai답변</h2>
//             <p>{answer}</p>

//         </div>
//         )
//       }
//     </div>
//     </main>
//   )
// }

// export default StudyPage