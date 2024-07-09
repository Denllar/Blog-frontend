import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from '../../axios';

export const AddPost = () => {
  const navigate = useNavigate()
  const [isChange, setIsChange] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [text, setText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState('')
  const fileRef = React.useRef()
  const { id } = useParams();
  const isEditing = Boolean(id)

  React.useEffect(() => {
    if (id) {
      axios.get(`posts/${id}`).then(({ data }) => {
        setTitle(data.title)
        setText(data.text)

        setTags(data.tags.join(',').replace(/,/g, ', '))
        console.log(data.tags);
        setImageUrl(data.imageUrl)
      })
    }
  }, [])

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      formData.append('image', event.target.files[0])
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
      setIsChange(true)
    } catch (err) {
      console.error(err);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
    setIsChange(true)
  };

  const onChange = React.useCallback((value) => {
    setText(value);
    setIsChange(true)
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(prev => prev = true)

      const post = {
        title,
        text,
        tags: tags.length===0 ? [] : tags.replace(/ /g, '').split(','),
        imageUrl
      }
      const { data } = isEditing ? await axios.patch(`/posts/${id}/edit`, post) : await axios.post('/posts/create', post)

      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`)


    } catch (err) {
      console.error(err);
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  console.log(imageUrl);
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => fileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>

      <input ref={fileRef} type="file" onChange={handleChangeFile} hidden />

      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} width={10} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />

      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => {
          setTitle(e.target.value)
          setIsChange(true)
        }}
        fullWidth
      />

      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" value={tags} onChange={e => {
        setTags(e.target.value)
        setIsChange(true)
      }} fullWidth />

      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />

      <div className={styles.buttons}>
        <Button disabled={!isChange} onClick={onSubmit} size="large" variant="contained">
          {
            isEditing ? 'Сохранить' : 'Опубликовать'
          }
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
