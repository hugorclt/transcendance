import React from 'react'
import Heptahedre from './Heptahedre'
import { THeptraheaderProps } from './THeptahedre'

function HeptaHeader({firstText, secondText}: THeptraheaderProps) {
  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
      <Heptahedre width={400} height={150} firstText={firstText} secondText={secondText}></Heptahedre>
    </div>
  )
}

export default HeptaHeader