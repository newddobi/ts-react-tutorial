import React, { useReducer, useContext, createContext, Dispatch } from "react";

// State를 위한 Context 를 만들고,
// Dispatch를 위한 Context를 만들 것입니다.
// 해당 Context에서 관리하고 있는 값을 쉽게 조회할 수 있도록 커스텀 Hooks 도 작성 할 것입니다.

// 필요한 타입들을 미리 선언

type Color = "red" | "orange" | "yellow";

// 상태를 위한 타입
type State = {
    count: number;
    text: string;
    color: Color;
    isGood: boolean;
};

// 모든 액션들을 위한 타입
type Action =
    | { type: "SET_COUNT"; count: number }
    | { type: "SET_TEXT"; text: string }
    | { type: "SET_COLOR"; color: Color }
    | { type: "TOGGLE_GOOD" };

// 디스패치를 위한 타입 (Dispatch 를 리액트에서 불러올 수 있음), 액션들의 타입을 Dispatch 의 Generics로 설정
type SampleDispatch = Dispatch<Action>;

// Context 만들기
/**
 * 
 * 이렇게 구현을 함으로써 Context 안에 들어있는 상태를 조회 할 때, 그리고 새로운 액션을 디스패치해야 할 때 자동완성이 되므로 여러분들의 개발 생산성을 높여줄 수 있습니다.
 * 
 * SampleStateContext를 정의할 때, createContext<State>({count: 0, ...}) 식으로 기본값을 지정 해 주고, 
 * useSampleState(): State {...} 으로 return type을 정의 해 주면, null check를 하지 않아도 됩니다.
 * 마찬가지로 SampleDispatchContext를 정의할 때, createContext<SampleDispatch>(() => null)로 해 주고 
 * useSampleDispatch(): SampleDispatch {...}으로 return type을 정의 해 주면, null check가 필요하지 않게 됩니다.
 * 
 */
const SampleStateContext = createContext<State | null>(null);
const SampleDispatchContext = createContext<SampleDispatch | null>(null);

// 리듀서
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_COUNT":
            return {
                ...state,
                count: action.count, // count가 자동완성되며, number 타입인걸 알 수 있습니다.
            };
        case "SET_TEXT":
            return {
                ...state,
                text: action.text, // text가 자동완성되며, string 타입인걸 알 수 있습니다.
            };
        case "SET_COLOR":
            return {
                ...state,
                color: action.color, // color 가 자동완성되며 color 가 Color 타입인걸 알 수 있습니다.
            };
        case "TOGGLE_GOOD":
            return {
                ...state,
                isGood: !state.isGood,
            };
        default:
            throw new Error("Unhandled action");
    }
}

// SampleProvider 에서 useReduer를 사용하고
// SampleStateContext.Provider 와 SampleDispatchContext.Provider 로 children 을 감싸서 반환합니다.
export function SampleProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
        count: 0,
        text: "hello",
        color: "red",
        isGood: true,
    });

    return (
        <SampleStateContext.Provider value={state}>
            <SampleDispatchContext.Provider value={dispatch}>
                {children}
            </SampleDispatchContext.Provider>
        </SampleStateContext.Provider>
    );
}

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useSampleState() {
    const state = useContext(SampleStateContext);
    if (!state) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
    return state;
}

export function useSampleDispatch() {
    const dispatch = useContext(SampleDispatchContext);
    if (!dispatch) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
    return dispatch;
}
