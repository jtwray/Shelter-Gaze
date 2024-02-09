import { useState, useEffect } from "react"

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({ width: 375, height: 600 })

    useEffect(() => {
        function handleResize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        handleResize()
        window.addEventListener("resize", handleResize())
        return () => {
            window.removeEventListener("resize", handleResize())
        }
    }, [])

    return [windowSize.width, windowSize.height]
}