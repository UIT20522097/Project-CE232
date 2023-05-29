import React, { useState } from "react";
import {  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { Container, Stack } from "@mui/system";
import { IconButton, InputAdornment } from "@mui/material";
import { FTextField } from "../components/form";
import { FormProvider } from "../components/form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { set, ref } from "firebase/database";
import { database } from "../firebase-config";

const loginSchema = Yup.object().shape({
  //   email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: false,
};

const LoginPage = () => {
  //   const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    let { email, password } = data;
    try {
      const setAuth = () => {
        set(ref(database, "auth/admin"), {
          state: "true",
        });
      };
      if (email === "admin" && password === "admin") {
        await setAuth();
        console.log("submit");
        // navigate("/")
      }
    } catch (error) {
    //   reset();
      console.log(error);
      setError("responseError", error);
    }
  };
  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </Container>
  );
};

export default LoginPage;
