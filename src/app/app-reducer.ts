export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type InitialStateType = {
    status: RequestStatusType,
    error: null | string
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export type SetStatusType = ReturnType<typeof setAppStatus>
export type SetErrorType = ReturnType<typeof setAppError>
export type SetInitialized = ReturnType<typeof setIsInitialized>

type ActionType = SetStatusType | SetErrorType | SetInitialized
export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}

export const setAppStatus = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const )
export const setAppError = (error: null | string) => ({type: "APP/SET-ERROR", error} as const )
export const setIsInitialized = (isInitialized: boolean) => ({type: "APP/SET-IS-INITIALIZED", isInitialized} as const)