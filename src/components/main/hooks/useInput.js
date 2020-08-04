import React, {useState} from "react";

export default function useInput(initialValue) {
    const [value, setValue] = useState(initialValue)

    function reset() {
        setValue('')
    }

    const bind = {
        value,
        onChange: e => {
            setValue(e.target.value)
        }
    }

    return {bind, reset}
}
