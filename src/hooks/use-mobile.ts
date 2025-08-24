"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

function useMobile() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  return isMobile
}

export { useMobile }