import React from 'react'

function ProfilBox() {
  return (
    <a href="#!">
        <div className='flex items-center'>
        <div className="shrink-0">
            <img className="rounded-full w-10" alt="avatar"></img>
        </div>
        <div className='flex flex-col ml-3'>
            <div className='grow '>
            <p className='text-lg font-semibold text-orange-100 mb-1'>hrecolet</p>
            </div>
            <select className="outline-none bg-gray-900 text-orange-100 opacity-60 text-sm font-extralight" name="status" id="status">
                <option value="online">Online</option>
                <option value="absent">Absent</option>
                <option value="invisible">Invisible</option>
            </select>
        </div>
        </div>
    </a>
  )
}

export default ProfilBox