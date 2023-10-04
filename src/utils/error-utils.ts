import {ResponseType} from "../api/todolists-api";
import {setAppError, setAppStatus, SetErrorType, SetStatusType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ActionsType} from "../features/TodolistsList/tasks-reducer";
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetErrorType | SetStatusType>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError("some error"))
    }
    dispatch(setAppStatus("failed"))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<SetErrorType | SetStatusType>) => {
    dispatch(setAppError(error.message ? error.message : "some error occurred"))
    dispatch(setAppStatus("failed"))
}