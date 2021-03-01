import React, { useState } from "react";

function Counter() {
    // useState 를 사용하실때 useState<number>() 와 같이 Generics 를 사용하여 해당 상태가 어떤 타입을 가지고 있을지 설정
    // useState를 사용 할 때 Generics 를 사용하지 않아도 알아서 타입을 유추하기 때문에 생략해도 상관없습니다
    // 상태가 null일 수도 있고 아닐수도 있을때 Generics 를 활용하시면 좋습니다
    const [count, setCount] = useState<number>(0);
    const onIncrease = () => setCount(count + 1);
    const onDecrease = () => setCount(count - 1);
    return (
        <div>
            <h1>{count}</h1>
            <div>
                <button onClick={onIncrease}>+1</button>
                <button onClick={onDecrease}>-1</button>
            </div>
        </div>
    );
}

export default Counter;
