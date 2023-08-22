'use client'
import { useState, useEffect } from 'react'
import Promptcard from './Promptcard'

const AllPrompts = ({ data, handletagclick }) => {
  return (
    <div className='mt-16 prompt_layout'>
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

  useEffect(() => {
    const fetchallposts = async () => {
      const response = await fetch('/api/prompt');
      const data =await response.json();
      setpost(data);
    }
    fetchallposts();

  }, [])

  const handlechange = (e) => {
    setsearchtext(e.target.value);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchtext}
          onChange={handlechange}
          required
          className='search_input peer'
        />
      </form>

      <AllPrompts
        data={post}
        handletagclick={() => { }}
      />



    </section>
  )
}

export default Feed