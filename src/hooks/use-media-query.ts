"use client"

import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useMediaQuery(query: string): boolean {
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    setValue(result.matches)
    result.addEventListener("change", onChange)

    return () => result.removeEventListener("change", onChange)
  }, [query])

  return value
}

export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`)
}