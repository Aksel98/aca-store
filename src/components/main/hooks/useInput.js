import React, {useState} from "react";

export default function useInput(val) {
    const [value, setValue] = useState(val)

    function onChange(e) {
        setValue(e.target.value)
    }

    return {
        value,
        onChange
    }
}
