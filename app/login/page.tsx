"use client";
import { Button } from "@/components/button";
import Input from "@/components/input";
import { useAppContext } from "@/hooks/useAppContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

/** Login mock page  for changing user to make changes and comments **/
const Login = () => {
  const router = useRouter();
  const { setUser } = useAppContext();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const user = { userName, password };
    setUser(user);
    router.push("/");
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="border border-gray-400 p-10 rounded-xl w-1/2 min-w-[300px]">
        <Input
          onChange={(e) => setUserName(e.target.value)}
          placeholder="User name"
          value={userName}
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="User name"
          type="password"
          value={password}
        />
        <Button className="w-full" onClick={login} value="Login" />
      </div>
    </div>
  );
};

export default Login;
