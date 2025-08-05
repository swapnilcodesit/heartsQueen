"use client";
import { onSubmit } from "@/utils/actions";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useActionState } from "react";

export default function Home() {
  const [state, formAction, isPending] = useActionState(onSubmit, {
    error: {},
    values:{
      fName:"",
      lName:"",
      email:"",
      pass:"",
      user:""
    }
  });

  console.log("check state" , state , isPending)

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-8">
        <div>
          <div>
            {" "}
            <TextField
              // required
              type="text"
              id="standard-basic"
              name="fName"
              label="First Name"
              variant="standard"
            />
           {
            state?.errors?.fName && <p className="text-red-600 text-[12px]">{state?.errors?.fName}</p>
           }
          </div>
          <div>
            {" "}
            <TextField
              id="standard-basic"
              type="text"
              name="lName"
              label="Last Name"
              variant="standard"
            />
            
          </div>
          <div>
            {" "}
            <TextField
              // required
              id="standard-basic"
              type="text"
              name="email"
              label="Email"
              variant="standard"
            />
            {
            state?.errors?.email && <p className="text-red-600 text-[12px]">{state?.errors?.email}</p>
           }
          </div>
          <div>
            <TextField
              // required
              id="standard-password-input"
              name="pass"
              label="Create Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
            {
            state?.errors?.pass && <p className="text-red-600 text-[12px]">{state?.errors?.pass}</p>
           }
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-1">
            <div>
              <Button
                disabled={isPending}
                type="submit"
                className="w-[100%]"
                variant="contained"
              >
                Sign Up
              </Button>
              {
                state.errors?.user &&  <p className="text-red-600 text-[12px]">{state?.errors?.user}</p>
              }
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
  );
}
