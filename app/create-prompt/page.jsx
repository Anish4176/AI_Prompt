"use client"
import Form from "@components/Form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Loading from "@components/Loading"

function Createprompt() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState({
    prompt: '',
    tags: '',
  })
  const [loading, setloading] = useState(false);

  const createprompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    try {
      setloading(true);
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          UserId: session.user.id,
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
  return (
    <>
      {loading && <Loading />}
      {!loading && <Form
        type="Create"
        post={post}
        setpost={setpost}
        submitting={submitting}
        setsubmitting={setsubmitting}
        handlesubmit={createprompt}
      />}
    </>
  )
}

export default Createprompt