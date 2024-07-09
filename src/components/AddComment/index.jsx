import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import axios from "../../axios";
import { useParams } from "react-router-dom";

export const Index = ({addComment}) => {
  const {data} = useSelector(state => state.authSlice)
  const [text, setText] = React.useState('')
  const {id} = useParams()
  const onSubmit = async () =>{
    try {
      await axios.post('/comments', {text, id})
      const comment = {
        text: text,
        user: {
          fullName: data.fullName,
          avatarUrl: data.avatarUrl
        }
      }
      addComment(comment)
      setText('')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={data.avatarUrl}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <Button disabled={!text} onClick={onSubmit} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
