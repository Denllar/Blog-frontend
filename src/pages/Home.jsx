import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fecthPosts, fecthTags } from '../redux/slices/postSlice';
import { useParams } from 'react-router-dom';

export const Home = () => {
  const toggle = window.localStorage.getItem('toggle')
  const [isClickToggle, setIsClickToggle] = React.useState(true)
  const dispatch = useDispatch()
  const { posts, tags } = useSelector(state => state.postSlice)
  const { data } = useSelector(state => state.authSlice)

  const isLoadingPosts = posts.status === 'loading'
  const isLoadingTags = tags.status === 'loading'

  const { tag } = useParams();

  React.useEffect(() => {
    dispatch(fecthPosts({ toggle, tag }))
    dispatch(fecthTags())
  }, [isClickToggle, tag])


  return (
    <>
      {
        tag && <h1>#{tag}</h1>
      }
      <Tabs style={{ marginBottom: 15 }} value={Number(toggle)} aria-label="basic tabs example">
        <Tab onClick={() => {
          setIsClickToggle(prev => !prev)
          window.localStorage.setItem('toggle', 0)
        }} label="Новые" />
        <Tab onClick={() => {
          setIsClickToggle(prev => !prev)
          window.localStorage.setItem('toggle', 1)
        }} label="Популярные" />
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isLoadingPosts ? [...Array(5)] : posts.items).map((item, index) => isLoadingPosts ? (<Post key={index} isLoading={true} />) : (
            <Post
              id={item._id}
              title={item.title}
              imageUrl={item.imageUrl}
              user={{
                avatarUrl: item.user?.avatarUrl,
                fullName: item.user?.fullName
              }}
              createdAt={item.createdAt.replace('T', ' время: ').replace('Z', '')}
              viewsCount={item.viewsCount}
              commentsCount={item.commentsCount}
              isLoading={isLoadingPosts}
              tags={item.tags}
              isEditable={data?._id === item.user?._id}
            />
          ))}
        </Grid>

        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isLoadingTags} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Цель этого сайта - вести свой блог',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'Чтобы друзья и другие люди могли видеть твои мысли, успех и просто быть в курсе твоих новостей?',
              },
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Да',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
