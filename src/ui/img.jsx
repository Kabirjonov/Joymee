import React from 'react'
import { logo } from '../constatnts'
function Img({height='72' ,circle,url}) {
    return (
        <img className={circle?'rounded-circle':'rounded'} src={url?url:logo} alt="" width={height} height={height} />
    )
}
export default Img