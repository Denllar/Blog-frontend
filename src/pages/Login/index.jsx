import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fecthAuth } from "../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch()
  const {data} = useSelector(state => state.authSlice)

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: 'denis@gmail.com',
      password: '123456'
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fecthAuth(values))
    
    if (!data.payload){
      return alert("Не удалось авторизоваться")
    }

    if ('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
      window.localStorage.setItem('toggle', 0)
    }
  }

  if (data) {
    return <Navigate to="/"/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          type="email"
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField c
          lassName={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
