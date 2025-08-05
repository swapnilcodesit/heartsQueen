"use server";

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function onSubmit(prevState, formData) {
  debugger;
  const fName = formData.get("fName");
  const lName = formData.get("lName");
  const email = formData.get("email");
  const pass = formData.get("pass");

  const errors = {};

  if (!fName) errors.fName = "First Name is Required";
  if (!email) errors.email = "Email is Required";
  if (!pass) errors.pass = "Password is Required";

  if (Object.keys(errors).length) {
    return { errors };
  } else {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      const user = auth.currentUser;
      return {
        errors: {},
        values: { user },
      };
    } catch {
      return {
        errors: { user: "Login Faild" },
      };
    }
  }
}
