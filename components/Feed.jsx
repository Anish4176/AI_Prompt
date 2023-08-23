'use client'
import { useState, useEffect } from 'react'
import Promptcard from './Promptcard'
import Loading from "@components/Loading"

const AllPrompts = ({ data, handletagclick }) => {
  return (
    <div className='mt-14 prompt_layout'>
      {data.length !==0 && data.map((post) => {
         return <Promptcard
            key={post._id}
            post={post}
            handletagclick={handletagclick}
          />
        })
      }
    </div>
  )

}

function Feed() {
  const [searchtext, setsearchtext] = useState("");
  const [post, setpost] = useState([]);
  const [searchedresult, setsearchedresult] = useState([]);
  const [searchtimeout, setsearchtimeout] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchallposts = async () => {
      setloading(true);
      const response = await fetch('/api/prompt');
      const data =await response.json();
     setloading(false);
      setpost(data);
    }
    fetchallposts();

  }, [])

  
  const filterprompt=(searchtext) => {
    const regex= new RegExp(searchtext,'i');  //case insensitive

    return post.filter((p)=>
      regex.test(p.tags)||
      regex.test(p.creator.username)||
      regex.test(p.prompt)
    );
  }

  const handlechange = (e) => {
    clearTimeout(searchtimeout);
    setsearchtext(e.target.value);
    
    setsearchtimeout(
      setTimeout(() => {
        const result=filterprompt(e.target.value);
        setsearchedresult(result);
      }, 500)
      );
  }
  const handletagclick=(tagname)=>{
    setsearchtext(tagname);
    const result=filterprompt(tagname);
    setsearchedresult(result);
  }
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a Prompt or tag or a username'
          value={searchtext}
          onChange={handlechange}
          required
          className='search_input peer'
        />
      </form>

      
      {loading && <Loading />}
      {!loading && searchtext ? <AllPrompts
        data={searchedresult}
        handletagclick={handletagclick}
      />: <AllPrompts
        data={post}
        handletagclick={handletagclick}
      />
      }
    </section>
  )
}

export default Feed