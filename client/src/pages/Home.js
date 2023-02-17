import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import UserRecipe from "../components/UserRecipe";
import {motion} from "framer-motion"
import React from 'react'
import Category from "../components/Category";
import Search from "../components/Search";

function Home() {
  return (
    <motion.div
        animate={{opacity: 1}}
        initial ={{opacity: 0}}
        exit = {{opacity: 0}}
        transition={{duration: 0.5}}
    >
        <Veggie/>
        <Popular/>
        <UserRecipe/>
    </motion.div>
  )
}

export default Home