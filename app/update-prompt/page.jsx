"use client"
import Form from "@components/Form"
import { useRouter,useSearchParams } from "next/navigation"
import { useState ,useEffect} from "react"
function Updateprompt() {
    const router = useRouter();
    const searchParams=useSearchParams();
    const promptId = searchParams.get('id');
    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        prompt: '',
        tags: '',
    })
    
    const editprompt = async (e) => {
        e.preventDefault();
        setsubmitting(true);
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tags: post.tags
                })

            });


            if (response.ok) {
                router.push('/');
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setsubmitting(false);
        }
    }
    useEffect(() => {
      const getpromptDetails = async()=>{
      const response = await fetch(`/api/prompt/${promptId}`);
      const data=await response.json();
      setpost({
        prompt:data.prompt,
        tags:data.tags
      });
      }
      if(promptId) getpromptDetails();
    }, [promptId])
    

  
    return (
        <Form
            type="Edit"
            post={post}
            setpost={setpost}
            submitting={submitting}
            setsubmitting={setsubmitting}
            handlesubmit={editprompt}
        />
    )
}

export default Updateprompt