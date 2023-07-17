import React, { useState, useEffect, useCallback } from "react";

export function useHover(node:HTMLElement){
  const [hover,setHover] = useState(false);
  const handleHover = useCallback((state:boolean) => {
    setHover(state)
  },[])
  useEffect(() => {
    node.addEventListener('mouseover',() => handleHover(true))
    node.addEventListener('mouseout',() => handleHover(false))
    return () => {
      node.removeEventListener('mouseover',() => handleHover(true))
      node.removeEventListener('mouseout',() => handleHover(false))
    }
  },[])
  return hover;
}