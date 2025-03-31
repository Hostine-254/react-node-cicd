import React from 'react'

import Logo_bg from '../assest/Logo_bg.png'

function Logo({w,h}) {
  return (
    <div>
        <img src={Logo_bg} width={w} height={h}/>
    </div>
  )
}

export default Logo