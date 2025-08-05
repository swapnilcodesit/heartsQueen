import { Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  //  height: 100vh;
  //     background: aqua;
  //     display: flex
  // ;
  //     flex-direction: column;
  //     gap: 15%;
  //     align-items: center;
  //     padding-top: 21%;
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div>
          {" "}
          <TextField
            id="standard-basic"
            label="UserName/Email Id"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-1">
          <div>
            <Button className="w-[100%]" variant="contained">
              Login
            </Button>
            <div className="text-[12px] text-center">Forgot your password</div>
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
            <Button className="w-[100%]" variant="contained">
              Play as Guest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
