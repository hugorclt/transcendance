import React from 'react'
import logo from "../../assets/42.jpg";

function FriendsCards() {
  return (
    <div>
        <div className='pt-2 pb-2 px-8'>
            <a href="#!">
                <div className="flex items-center">
                    <div className="relative">
                        <img className="rounded-full w-10" src={logo}></img>
                        <div className="absolute outline outline-2 outline-orange-100 rounded-full bottom-0 right-0 w-2 h-2 bg-lime-500"></div>
                    </div>
                    <div className='flex flex-col mx-3'>
                        <p className="text-base font-semibold text-orange-100 mb-0">
                        dsaada
                        </p>
                        <p className="outline-none bg-gray-900 text-orange-100 opacity-60 text-sm font-extralight">Online</p>
                    </div>
                </div>
            </a>
        </div>
    </div>
  )
}

export default FriendsCards