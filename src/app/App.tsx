import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {CircularProgress} from "@mui/material";
import CustomizedSnackbars from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {meTC} from "../features/Login/auth-reducer";


function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(meTC())
    },[])
    if (!isInitialized){
        return <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === "loading" && <CircularProgress/>}
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList/>}/>
                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"404"} element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path={"*"} element={<Navigate to={"404"}/>}/>
                </Routes>
            </Container>
            <CustomizedSnackbars/>
        </div>
    )
}

export default App
