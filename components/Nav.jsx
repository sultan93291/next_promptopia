"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setproviders] = useState(null);
  const [toggledropDown, setoggledropDown] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setproviders(res);
    })();
  }, []);

  return (
    <nav className=" flex-between w-full mb-16 pt-3 ">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop  navigation  */}

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className=" flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              {" "}
              Sign Out{" "}
            </button>
            <Link href={"/profile"}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className=" rounded-full "
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation  */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className=" rounded-full "
              alt="profile"
              onClick={() => setoggledropDown(prev => !prev)}
            />

            {toggledropDown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setoggledropDown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setoggledropDown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  className="black_btn mt-5 w-full"
                  onClick={() => {
                    setoggledropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
