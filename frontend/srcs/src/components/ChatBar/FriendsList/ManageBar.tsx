import React from 'react'
import {AiOutlineUsergroupAdd} from 'react-icons/ai'
import {BiSearchAlt2} from 'react-icons/bi'
import { IconContext } from 'react-icons/lib'

function ManageBar() {
  return (
    <div className='flex justify-between items-center mx-3'>
        <div>
            <h2 className='text-orange-100'>Friends</h2>
        </div>
        <div className='mx-3'>
            <button className='mx-3'>
                <IconContext.Provider value={{ color: "#E8C47C" }}>
                    <AiOutlineUsergroupAdd />
                </IconContext.Provider>
            </button>
            <button>
                <IconContext.Provider value={{ color: "#E8C47C" }}>
                    <BiSearchAlt2 />
                </IconContext.Provider>
            </button>
        </div>
    </div>
  )
}

export default ManageBar