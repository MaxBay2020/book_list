import React, {useEffect, useState} from 'react';


const useDebounce = (value, delay = 0.5) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay * 1000)

        return () => clearTimeout(timer)
    }, [value, delay]);


    return debouncedValue
};

export default useDebounce;