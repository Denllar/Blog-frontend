import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [post, setPost] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)
  const [comments, setComments] = React.useState([])

  const { id } = useParams()

  React.useEffect(() => {
    axios.get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data)
        setIsLoading(false)
      })
      .catch(err => console.error(err))

    axios.get(`/comments/${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err))
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }
  console.log(comments);
  return (
    <>
      <Post
        id={post.id}
        title={post.title}
        imageUrl={post.imageUrl}
        user={{
          avatarUrl: post.user?.avatarUrl,
          fullName: post.user?.fullName,
        }}
        createdAt={post.createdAt.replace('T', ' время: ').replace('Z', '')}
        viewsCount={post.viewsCount}
        commentsCount={post.commentsCount}
        tags={post.tags}
        isFullPost
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        items={comments}
        isLoading={false}
      >
        <Index addComment={(obj) => setComments(prev => [...prev, obj])} />
      </CommentsBlock>
    </>
  );
};
