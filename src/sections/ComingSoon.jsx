import React from 'react'

function ComingSoon() {
  return (
    <div className="flex flex-col  rounded-lg  items-center justify-center h-screen bg-gradient-to-b from-purple-900 to-gray-900">
      <h1 className="text-5xl font-bold text-white mb-8">
        <span className="text-blue-500">NFT-Metaverse Coming</span> Soon
      </h1>
      <div className="relative w-64 h-64">
        <div className="moving-graphic rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse"></div>
      </div>
    </div>

  )
}

export default ComingSoon