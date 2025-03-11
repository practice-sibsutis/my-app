import React, { useState } from 'react';

const Counter = () => {
    const [state, setState] = useState(0);

    function increment() {
        setState(() => state + 1);
    }
    
    function decrement(params) {
        setState(() => state - 1);
    }

    return (
        <div>
            <h1>{state}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter;