import { Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  async function onSubmit(formData) {
    "use server";
    console.log("checlk form", formData);

    const fName = formData.get("fName");
    console.log("checlk e", fName);
  }

  return (
    <div className="flex flex-col gap-8">
      <form action={onSubmit}>
        <div>
          <div>
            {" "}
            <TextField
              required
              type="text"
              id="standard-basic"
              name="fName"
              label="First Name"
              variant="standard"
            />
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
              required
              id="standard-basic"
              type="text"
              name="email"
              label="Email"
              variant="standard"
            />
          </div>
          <div>
            <TextField
              required
              id="standard-password-input"
              name="pass"
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

            {/* <div>
              <Button
                component={Link}
                href="/login"
                className="w-[100%]"
                variant="contained"
              >
                Login
              </Button>
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
}
