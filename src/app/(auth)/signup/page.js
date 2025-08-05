"use client"
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {


    const onSubmit =(e)=>{
        debugger
        e.preventDefault();
        console.log("checlk e",e)
    }


  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={onSubmit}>
        <div>
          <div>
            {" "}
            <TextField
              required
              id="standard-basic"
              name = "fName"
              label="First Name"
              variant="standard"
            />
          </div>
          <div>
            {" "}
            <TextField
              id="standard-basic"
              name = "LName"
              label="Last Name"
              variant="standard"
            />
          </div>
          <div>
            {" "}
            <TextField
              required
              id="standard-basic"
              name = "email"
              label="Email"
              variant="standard"
            />
          </div>
          <div>
            <TextField
              required
              id="standard-password-input"
              name = "pass"
              label="Create Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-1">
            <div>
              <Button type="submit" className="w-[100%]" variant="contained">
                Sign Up
              </Button>
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
      </form>
    </div>
  );
}
