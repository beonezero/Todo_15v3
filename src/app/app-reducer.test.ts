import {appReducer, InitialStateType, setAppError, setAppStatus} from "./app-reducer";

let startState: InitialStateType;
beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized: false

    };
});

test("set status", () => {
    const action = setAppStatus("loading");

    const endState = appReducer(startState, action)

    expect(endState.status).toBe("loading");
});

test("set error", () => {
    const action = setAppError("Some error");

    const endState = appReducer(startState, action)

    expect(endState.error).toBe("Some error");
});