"use client";
import { auth, db } from "@/lib/firebase";
import { onSubmit } from "@/utils/actions";
import { Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";


export default function Home() {
  const [state, formAction, isPending] = useActionState(onSubmit, {
    error: {},
    values: {
      fName: "",
      lName: "",
      email: "",
      pass: "",
      user: null,
    },
  });

   const [signupState, setsignupState] = useState("");
  const router = useRouter();

  async function submitUser(values) {
    const { fName, lName, email, pass } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      const user = auth.currentUser;
      
      if(user){
       await setDoc(doc(db , "Users" , user.uid) , {
        fName,
        email,
        lName : lName || ""
       })
      }

      router.push("/login");
    } catch {
      setsignupState("Something went wrong!, Please try agian later")

    }
  }

  useEffect(() => {
    if (!Object.keys(state.error).length && state.values.fName) {
      submitUser(state.values);
    }
  }, [state.error]);


  return (
    <>
    
     <div className="h-6 text-[14px] text-red-400">{signupState || ""}</div>
    <form action={formAction}>
      <div className="flex flex-col gap-8">
        <div className="w-60">
          <div>
            {" "}
            <TextField
              className="w-[100%]"
              // required
              type="text"
              id="standard-basic"
              name="fName"
              defaultValue={state.values.fName}
              label="First Name"
              variant="standard"
            />
            {state?.error?.fName && (
              <p className="text-red-600 text-[12px]">{state?.error?.fName}</p>
            )}
          </div>
          <div>
            {" "}
            <TextField
              className="w-[100%]"
              id="standard-basic"
              type="text"
              defaultValue={state.values.lName}
              name="lName"
              label="Last Name"
              variant="standard"
            />
          </div>
          <div>
            {" "}
            <TextField
              className="w-[100%]"
              // required
              id="standard-basic"
              type="text"
              defaultValue={state.values.email}
              name="email"
              label="Email"
              variant="standard"
            />
            {state?.error?.email && (
              <p className="text-red-600 text-[12px]">{state?.error?.email}</p>
            )}
          </div>
          <div>
            <TextField
              className="w-[100%]"
              // required
              id="standard-password-input"
              name="pass"
              defaultValue={state.values}
              label="Create Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
            {state?.error?.pass && (
              <p className="text-red-600 text-[12px]">{state?.error?.pass}</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-1">
            <div>
              <Button
                disabled={isPending}
                loading={isPending}
                type="submit"
                className="w-[100%]"
                variant="contained"
              >
                Sign Up
              </Button>
              {state.errors?.user && (
                <p className="text-red-600 text-[12px]">
                  {state?.error?.user}
                </p>
              )}
            </div>
            <div className="text-center text-[12px]">Or</div>

            <div>
              <Button
                component={Link}
                href="/login"
                className="w-[100%]"
                variant="contained"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
    </>
    
  );
}
