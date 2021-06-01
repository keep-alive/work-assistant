import { useState, useEffect } from 'react';
const useKeyPress = (targetKeyCode) => {
    const [ keyPressed, setKeyPressed ] = useState(false)
    const keyDownHandler = ({keyCode}) => {
        if(targetKeyCode === keyCode) {
            setKeyPressed(true)
        }
    }
    const keyUpHandler = ({keyCode}) => {
        if(targetKeyCode === keyCode) {
            setKeyPressed(false)
        }
    }
    useEffect(() => {
        document.addEventListener('keyup',keyUpHandler)
        document.addEventListener('keydown',keyDownHandler)
        return () => {
            document.removeEventListener('keyup',keyUpHandler)
            document.removeEventListener('keydown',keyDownHandler)
        }
    },[])
    return keyPressed
}
export default useKeyPress;