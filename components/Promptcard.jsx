'use client'
import Image from "next/image"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter,usePathname } from "next/navigation"

function Promptcard({ post, handletagclick,handleEdit,handleDelete }) {
  const {data:session} = useSession();
  const pathName= usePathname();
  const router = useRouter();
  const [copied, setcopied] = useState('')

  const handlecopy=()=>{
    setcopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setcopied('');
    }, 5000);
  }

  const handleusername=()=>{
    if(post.creator._id=== session?.user.id) return router.push('/profile')

    router.push( `/profile/${post.creator._id}?name=${post.creator.username}`)
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div onClick={handleusername} className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3  className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handlecopy}>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt="copy"
            width={15}
            height={15}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt} </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={()=>handletagclick && handletagclick(post.tags)}>{'#' + post.tags} </p>

     {
      session?.user.id === post.creator._id && pathName==='/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
        </div>
      )
     }
    </div>
  )
}

export default Promptcard