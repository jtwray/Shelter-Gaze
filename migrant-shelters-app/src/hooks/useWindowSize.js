import { useState, useEffect } from "react"

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({ width: 375, height: 600 })

    useEffect(() => {
        function handleResize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        handleResize() // Initial size
        window.addEventListener("resize", handleResize) // Note: Removed the () 
        return () => {
            window.removeEventListener("resize", handleResize) // Note: Removed the ()
        }
    }, [])

    return [windowSize.width, windowSize.height]
}