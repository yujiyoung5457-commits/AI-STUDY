import OpenAI from "openai";
import type { AiRequest, Studymode } from "@/types/study";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Questget = (mode: Studymode) => {
  if (mode === 'explain') {
    return `너는 리액트 초보자를 쉽게 가르쳐주는 선생님이야.
사용자의 질문을 아주 쉽게 설명해줘.
근본적인 개념도 간단하게 설명해줘.
가능하면 코드 예제도 보여줘.`;
  }

  if (mode === 'quiz') {
    return `너는 리액트 초보자를 쉽게 가르쳐주는 선생님이야.
사용자가 입력한 주제와 관련된 아주 쉬운 문제를 1개 만들어줘.
정답은 바로 알려주지 마.`;
  }

  return `너는 리액트 초보자를 쉽게 가르쳐주는 선생님이야.
정답을 알려주지 말고 힌트를 제공해줘.`;
};
export const POST =async(request:Request)=>{
    try{
        const body:AiRequest=await request.json()
        const {message, mode}=body;

        if(!message?.trim()){
            return Response.json({message:'질문을 입력해 주세요'},{status:400})
        }

        const res=await openai.responses.create({
            model:'gpt-5-mini',
            instructions: Questget(mode),
            input: message,
        })

        return Response.json({
            answer:res.output_text
        })
    }catch{
        return Response.json({
            message:"ai요청 중 오류가 발생했습니다"
        },{
            status:500
        })
    }
}
