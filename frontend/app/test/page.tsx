"use client";

import { useState, useEffect } from "react";

export default function TestPage() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <h1>Test Page</h1>
            <p>Count: {count}</p>
        </div>
    );
}
