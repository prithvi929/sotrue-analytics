"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, useState } from "react";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
      });
      if (response?.error) {
        console.error("Authentication error:", response.error);
      } else if (response?.ok) {
        console.log("Authentication successful!");
        router.push("/")
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <section className="w-full max-w-96">
      <Image
        src="/logo-2x.png"
        alt="sotrue logo"
        height={99}
        width={225}
        priority
        className="m-auto"
      />
      <div className="text-4xl text-white font-medium text-center">Log in</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mt-14">
          <div className="bg-[#121A32] py-3.5 px-7 rounded">
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent outline-none text-xs text-[#ffffff99] w-full"
              value={userInfo.email}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
            />
          </div>
          <div className="bg-[#121A32] py-3.5 px-7 rounded">
            <input
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-xs text-[#ffffff99] w-full"
            />
          </div>
        </div>
        <div className="mt-5">
          <input
            type="submit"
            value="Log in"
            className="bg-[#CD8168] py-3.5 w-full px-7 rounded text-center text-white cursor-pointer"
          />
        </div>
      </form>
    </section>
  );
};

export default Login;
