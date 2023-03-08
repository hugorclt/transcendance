import React from 'react'
import { BottomBarContainer } from './BottomBarStyle'
import { MdNotificationsNone, MdSettings, MdLogout } from 'react-icons/md'
import { COLORS } from '../../../colors'

function BottomBar() {
  return (
    <BottomBarContainer>
        <MdNotificationsNone size={26} style={{color: COLORS.secondary}}/>
        <MdSettings size={26} style={{color: COLORS.secondary}}/>
        <MdLogout size={26} style={{color: COLORS.secondary}}/>
    </BottomBarContainer>
  )
}

export default BottomBar