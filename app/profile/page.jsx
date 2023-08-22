'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from '@components/Profile'


function Myprofile() {
    const router = useRouter();
    const {data:session} = useSession();
    const [posts, setposts] = useState([])
    
    useEffect(() => {
        const fetchallposts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setposts(data);
        }
       if(session?.user.id) fetchallposts();

    }, [posts.length]);

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete =async (post) => {
      const hasconfirmed= confirm('Are you sure you want to delete this prompt?');
      if(hasconfirmed) {
        try{
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method:'DELETE'
          });
        const filteredpost= posts.filter((p)=>{p._id!== post._id});
        setposts(filteredpost);

        }catch(e){
            console.log(e);
        }
      }
    }
    return (
        <Profile
            name='My'
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            />
        
    )
}

export default Myprofile