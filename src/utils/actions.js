"use server";

export async function onSubmit(prevState, formData) {
  const fName = formData.get("fName");
  const lName = formData.get("lName");
  const email = formData.get("email");
  const pass = formData.get("pass");

  const errors = {};

  if (!fName) errors.fName = "First Name is Required";
  if (!email) errors.email = "Email is Required";
  if (!pass) errors.pass = "Password is Required";

  if (Object.keys(errors).length) {
    return {
      error: errors,
      values: {
        user: null,
        fName,
        lName,
        email,
        pass,
      },
    };
  } else {
    return {
      error: {},
      values: { user: "Hi", fName, lName, email, pass },
    };
  }
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const pass = formData.get("pass");

  const errors = {};

  if (!email) errors.email = "Email is Required";
  if (!pass) errors.pass = "Password is Required";

  if (Object.keys(errors).length) {
    return { error: errors  , values:{email , pass}};
  } else {
    return {
      error: {},
      values: { email, pass },
    };
  }
}
