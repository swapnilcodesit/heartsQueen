"use client";
import { auth } from "@/lib/firebase";
import { login } from "@/utils/actions";
import { Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function Home() {
  const [state, formAction, isPending] = useActionState(login, {
    error: {},
    values: {
      email: "",
      pass: "",
    },
  });

  const [loginState, setLoginState] = useState("");

  const router = useRouter();

  async function loginUser(values) {
    const { email, pass } = values;
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      router.push("/game");
    } catch {
      setLoginState("Invalid Email or password");
    }
  }

  useEffect(() => {
    if (!Object.keys(state.error).length && state.values.email) {
      loginUser(state.values);
    }
  }, [state.error]);

  return (
    <>
      <div className="h-6 text-[14px] text-red-400">{loginState || ""}</div>
      <form action={formAction}>
        <div className="flex flex-col gap-8">
          <div className="w-60">
            <div>
              {" "}
              <TextField
                className="w-[100%]"
                id="standard-basic"
                name="email"
                defaultValue={state.values.email}
                label="UserName/Email Id"
                variant="standard"
              />
              {state?.error?.email && (
                <p className="text-red-600 text-[12px]">
                  {state?.error?.email}
                </p>
              )}
            </div>
            <div>
              <TextField
                className="w-[100%]"
                id="standard-password-input"
                name="pass"
                defaultValue={state.values.pass}
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
              />
              {state?.error?.email && (
                <p className="text-red-600 text-[12px]">
                  {state?.error?.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-1">
              <div>
                <Button type="submit" className="w-[100%]" variant="contained">
                  Login
                </Button>
                <div className="text-[12px] text-center">
                  Forgot your password
                </div>
              </div>

              <div className="text-center text-[12px]">Or</div>
              <div>
                <Button
                  component={Link}
                  href="/signup"
                  className="w-[100%]"
                  variant="contained"
                >
                  Sign Up
                </Button>
              </div>
              <div className="text-center text-[12px]">Or</div>
              <div>
                <Button disabled={isPending} loading={isPending} className="w-[100%]" variant="contained">
                  Play as Guest
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
