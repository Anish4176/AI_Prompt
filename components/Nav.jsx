"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
function Nav() {
    const session= useSession();
    const [providers, setproviders] = useState(null);
    const [toggledropdown, settoggledropdown] = useState(false);

    useEffect(() => {
        ( async () => {
            const response = await getProviders();
            setproviders(response);
        })();
       
    }, [])

    return (
        <nav className="w-full flex justify-between mb-16 mt-3">
            <Link href="/" className="flex gap-2 justify-center">
                <Image
                    src="/assets/images/logo.svg"
                    alt="Apnaprompt logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text mt-1">Apnaprompt</p>
            </Link>

            {/* Desktop Navigation  */}
            <div className="sm:flex hidden">
                {session.status=="authenticated" ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>

                        <button type="button"onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                                src={session.data.user.image}
                                width={37}
                                height={37}
                                alt="profile"
                                className="rounded-full"
                            />
                        </Link>
                    </div>

                ) : (
                    <>
                    
                    {providers && Object.values(providers).map((provider) => {
                       return <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn("google")}
                            className="outline_btn">
                            Sign In
                        </button>
                       
                    })}
                    </>
                )}
            </div>


            {/* mobile Navigation */}
            
            {session.status=="authenticated"  ? (
               
                <div className="sm:hidden flex relative">
                    <Image
                     src={session.data.user.image}
                     width={37}
                     height={37}
                     className="rounded-full"
                     alt="profile"
                     onClick={() =>settoggledropdown((prev)=> 
                        !prev)}
                    />
                    {toggledropdown && (
                        <div className="dropdown">
                            <Link
                              href='/profile'
                              onClick={() =>{settoggledropdown(false)}}
                              className="dropdown_link"
                            >
                            My Profile
                            </Link>
                            <Link
                              href='/create-prompt'
                              onClick={() =>{settoggledropdown(false)}}
                              className="dropdown_link"
                            >
                            Create Prompt
                            </Link>
                            <button
                             type="button"
                             onClick={()=>{
                                settoggledropdown(false)
                                signOut();
                            }}
                             className="black_btn w-full mt-3"
                            >
                             Sign out
                            </button>
                        </div>
                    )}
                </div>
            ):( <>
            
                {providers && Object.values(providers).map((provider) => {
                   return <button
                        type="button"
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className="black_btn sm:hidden flex">
                        Sign In
                    </button>
                })}
                </>
            )}
        </nav>
    )
}

export default Nav