import React from 'react'
import { useState } from 'react'

function Favourites() {
    const [veggie,setVegFav] = useState([])
    const [popular,setPopFav] = useState([])
    const [usrRec,setUsrFav] = useState([])

  return (
    <div>Favourites</div>
  )
}

export default Favourites