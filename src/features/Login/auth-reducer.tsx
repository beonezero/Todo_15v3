import {Dispatch} from 'redux'
import {setAppError, setAppStatus, SetErrorType, SetStatusType} from '../../app/app-reducer'
import {FormikType} from "./Login";
import {auth} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: FormikType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await auth.authorization(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            setAppStatus("succeeded")
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as {message: string}), dispatch)
    }

}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusType | SetErrorType
