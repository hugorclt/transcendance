import React from 'react'

function ChatBar() {
  return (
    <div>
        <div className='w-60 h-full shadow-md bg-white absolute float-right'>
          <div className='pt-4 pb-2 px-6'>
            <a href="#!">
              <div className='flex items-center'>
                <div className="shrink-0">
                  <img className="rounded-full w-10" alt="avatar"></img>
                </div>
                <div className='grow ml-3'>
                  <p className='text-sm font-semibold text-blue-600'>hrecolet</p>
                </div>
              </div>
            </a>
          </div>
        </div>
    </div>
  )
}

export default ChatBar