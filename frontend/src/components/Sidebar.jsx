import React, { useRef } from 'react'
import { sidebarStyles,cn } from '../assets/dummyStyles'
import {motion} from "framer-motion"
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = ({user , isCollapsed,setIsCollapsed}) => {

    const {pathname} = useLocation();
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

  return (
    <>
<motion.div>

</motion.div>
    </>
  )
}

export default Sidebar
