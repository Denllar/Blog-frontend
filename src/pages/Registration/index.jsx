import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from '../../axios';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { fecthRegister } from "../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.authSlice)
  const fileRef = useRef();
  const [avatarUrl, setAvatarUrl] = React.useState('')
  const [toggle, setToggle] = React.useState(false)

  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
    defaultValues: {
      avatarUrl: '',
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fecthRegister(values))

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться")
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
      window.localStorage.setItem('toggle', 0)
    }
  }

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      formData.append('image', event.target.files[0])
      const { data } = await axios.post('/upload', formData);
      const URL = `http://localhost:4444${data.url}`
      setValue('avatarUrl', URL)
      setAvatarUrl(URL)
    } catch (err) {
      console.error(err);
    }
  };

  if (data) {
    return <Navigate to="/" />
  }

  const choseAvatarUrlAlert = () => {
    if (!avatarUrl){
      setToggle(true)
    } else {
      setToggle(false)
    }
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <Avatar className={styles.ava} onClick={() => fileRef.current.click()} sx={{ width: 100, height: 100 }} />
          <input ref={fileRef} type="file" onChange={handleChangeFile} hidden />
        </div>
        <TextField
          className={styles.field}
          label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          fullWidth
          {...register('fullName', { required: 'Укажите полное имя' })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          fullWidth
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type='password'
          fullWidth
          {...register('password', { required: 'Укажите пароль' })}
        />

        <Button
          onMouseOver={choseAvatarUrlAlert}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          disabled={!isValid}
        >
          Зарегистрироваться
        </Button>
        {
          toggle && <p>Можно выбрать аву</p>
        }
      </form>
    </Paper>
  );
};
