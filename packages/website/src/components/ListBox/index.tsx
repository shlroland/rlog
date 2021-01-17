const ListBox = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow min-h-64 w-full bg-white">
      <div className="py-5 px-3">
        <div className="flex justify-between px-2 py-2 border-b border-gray-300">
          <p className="flex text-gray-700">
            <svg className="w-2 text-gray-500 mx-2" viewBox="0 0 8 8" fill="currentColor">
              <circle cx="4" cy="4" r="3" />
            </svg>
            Tighten Co.
          </p>
        </div>
        <div className="flex justify-between px-2 py-2">
          <p className="flex text-gray-700">Tighten Co.</p>
          <p className="text-gray-500 font-thin">Team</p>
        </div>
        <div className="flex justify-between px-2 py-2 bg-blue-100 rounded">
          <p className="flex text-gray-700">Laracasts</p>
          <p className="text-gray-500 font-thin">Team</p>
        </div>
      </div>
    </div>
  )
}

export default ListBox
