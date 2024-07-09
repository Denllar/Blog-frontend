import React from "react"
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fecthAuthMe } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fecthAuthMe())
  }, [])
  
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path={'/'} element={<Home />}/>
          <Route path={'/posts/:id'} element={<FullPost />}/>
          <Route path={'/posts/:id/edit'} element={<AddPost />}/>
          <Route path={'/posts/create'} element={<AddPost />}/>
          <Route path={'/login'} element={<Login />}/>
          <Route path={'/register'} element={<Registration />}/>
          <Route path={'/tags/:tag'} element={<Home />}/>

        </Routes>
      </Container>
    </>
  );
}

export default App;
