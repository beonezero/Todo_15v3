export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type InitialStateType = {
    status: RequestStatusType,
    error: null | string
}

const initialState: InitialStateType = {
    status: "idle",
    error: null
}

export type SetStatusType = ReturnType<typeof setAppStatus>
export type SetErrorType = ReturnType<typeof setAppError>

type ActionType = SetStatusType | SetErrorType
export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setAppStatus = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const )
export const setAppError = (error: null | string) => ({type: "APP/SET-ERROR", error} as const )