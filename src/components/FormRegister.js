import React from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import setRegister from "../services/setRegister";
import useUser from "../hooks/useUser";
import { useLocation } from "wouter";

const FormRegister = () => {
  const { login, isLogged } = useUser();
  const [, navigate] = useLocation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("Required")
        // .min(2, "first name too much long!!"),
      // // lastName: Yup.string().required("Required"),
      // email: Yup.string().email("Invalid email").required("Required"),
      // password: Yup.string()
      //   .required("Required")
      //   .oneOf([Yup.ref("repeatPassword")], "Password not match"),
      // repeatPassword: Yup.string()
      //   .required("Required")
      //   .oneOf([Yup.ref("password")], "Password not match"),
    }),
    onSubmit: (form) => {
      console.log("form ", form);

      setRegister({ form })
        .then((status) => {
          console.log("status ", status);
          if (status) {
            login({ username: form.email, password: form.password });
            // llamar al hook useUser para obtener el jwt(token)
            console.log("isLogged ", isLogged);
            if (isLogged) {
              console.log("entr..rrrrrrrrrrr")
              navigate("/");
            }
          }

          // window.sessionStorage.setItem("token", jwt);
          // setJWT(jwt);
          // setGifs(gifs);
          // localStorage.setItem("lastKeyword", keyword);
          // console.log("user eff ", gifs);
          //   actions.setSubmitting(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Container
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "60vh",
      }}
    >
      <h2>Register</h2>
      <Form onSubmit={formik.handleSubmit} style={{ width: "30%" }}>
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Name"
          name="firstName"
          error={formik.errors.firstName}
          value={formik.values.firstName}
          autoComplete="off"
        />
        {/* <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Primer Apellido"
          name="lastName"
        /> */}
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          error={formik.errors.email}
          autoComplete="off"
        />
        <Form.Input
          onChange={formik.handleChange}
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          autoComplete="off"
          error={formik.errors.password}
        />
        <Form.Input
          type="password"
          placeholder="Repeat password"
          name="repeatPassword"
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
          autoComplete="off"
        />

        <Button className="ui primary button" type="submit">
          Register
        </Button>
        <Button
          className="ui secondary button"
          type="button"
          onClick={formik.handleReset}
        >
          Clean!!
        </Button>
      </Form>
    </Container>
  );
};

export default FormRegister;
