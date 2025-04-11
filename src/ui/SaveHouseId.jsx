import React from 'react'
import { useDispatch } from 'react-redux'
import { addHouse } from '../slice/saveHouse'

function SaveHouseId(id) {
  
const dispatch = useDispatch()
    return (
        <>
        <button onClick={()=>dispatch(addHouse(id))} className='btn btn-success'>Save</button>
        </>
    )
}

export default SaveHouseId
