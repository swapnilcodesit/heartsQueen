import { Button, TextField } from "@mui/material";
import Image from "next/image";

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
    <div>
      <div className="">
        <div className="h-[100vh] bg-red-300 flex flex-col gap-[15%] items-center pt-[21%]">
          <div>
            <h1 className="text-2xl font-bold">Login</h1>
          </div>

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
              <div className="flex flex-col gap-3">
                <div>
                  <Button className="w-[100%]" variant="contained">Login</Button>
                  <div className="text-[12px] text-center" >Forgot your password</div>
                </div>

                <div>
                  <Button className="w-[100%]" variant="contained">Sign Up</Button>
                </div>
                <div>
                  <Button className="w-[100%]" variant="contained">Play as Guest</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
