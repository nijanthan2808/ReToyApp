import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuthForm({ handleLogin, handleGoogleLogin }) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-medium">User Login</h2>
      <form className="grid gap-4 mt-2 max-w-sm" onSubmit={handleLogin}>
        <Input name="email" placeholder="Email" type="email" required />
        <Input name="password" placeholder="Password" type="password" required />
        <Button type="submit">Login</Button>
      </form>
      <div className="mt-4">
        <Button onClick={handleGoogleLogin}>Login with Google</Button>
      </div>
    </div>
  );
}
