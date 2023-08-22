"use client"
import Form from "@components/Form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
function Createprompt() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState({
    prompt: '',
    tags: '',
  })
  const createprompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          UserId: session.user.id,
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
  return (
    <Form
      type="Create"
      post={post}
      setpost={setpost}
      submitting={submitting}
      setsubmitting={setsubmitting}
      handlesubmit={createprompt}
    />
  )
}

export default Createprompt