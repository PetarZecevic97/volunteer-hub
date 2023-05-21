import React, { useState, useEffect } from "react";
import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';

import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const DebugPanel = () => {
      return <SideNav
            onSelect={
                  (selected:any) => 
                  {
                        console.log(selected)
                  }
            }
      >
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="home">
                  <NavItem>
                        <NavIcon></NavIcon>
                        <NavText></NavText>
                  </NavItem>
            </SideNav.Nav>
      </SideNav>

}

export default DebugPanel;