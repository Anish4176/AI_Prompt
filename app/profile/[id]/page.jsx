'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter,useSearchParams } from "next/navigation"
import Profile from '@components/Profile'
import Loading from "@components/Loading"

function Userprofile({params}) {
    const searchparams=useSearchParams();
    const username=searchparams.get('name');
    const router = useRouter();
    const {data:session} = useSession();
    const [userdata, setuserdata] = useState([])
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const fetchallposts = async () => {
            setloading(true);
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
            setloading(false);
            setuserdata(data);
        }
       if(params?.id) fetchallposts();

    }, [params.id]);

   
    return (
        <>
      {loading && <Loading />}
      {!loading &&<Profile
            name={username}
            desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
            data={userdata}
            
            />}
            </>
        
    )
}

export default Userprofile