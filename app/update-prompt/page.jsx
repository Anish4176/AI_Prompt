"use client"
import Form from "@components/Form"
import { useRouter,useSearchParams } from "next/navigation"
import { useState ,useEffect} from "react"
import Loading from "@components/Loading"

function Updateprompt() {
    const router = useRouter();
    const searchParams=useSearchParams();
    const promptId = searchParams.get('id');
    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        prompt: '',
        tags: '',
    })
    const [loading, setloading] = useState(false);
    
    const editprompt = async (e) => {
        e.preventDefault();
        setsubmitting(true);
        try {
            setloading(true);
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tags: post.tags
                })

            });
            setloading(false);

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
      setloading(true);
      const response = await fetch(`/api/prompt/${promptId}`);
      const data=await response.json();
      setloading(false);
      setpost({
        prompt:data.prompt,
        tags:data.tags
      });
      }
      if(promptId) getpromptDetails();
    }, [promptId])
    

  
    return (
        <>
      {loading && <Loading />}
      {!loading &&<Form
            type="Edit"
            post={post}
            setpost={setpost}
            submitting={submitting}
            setsubmitting={setsubmitting}
            handlesubmit={editprompt}
        />}
        </>
    )
}

export default Updateprompt