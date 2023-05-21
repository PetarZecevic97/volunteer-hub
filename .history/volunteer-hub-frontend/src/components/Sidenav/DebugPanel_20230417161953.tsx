import React, { useState, useEffect } from "react";
import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';

import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const DebugPanel = () => {
      return <SideNav
            onSelect={
                  selected => 
                  {
                        console.log(selected)
                  }
            }
      ></SideNav>

}

export default DebugPanel;