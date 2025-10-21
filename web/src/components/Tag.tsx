export default function Tag({id, name}: {id: string; name: string}) {
  return (
    <div
      key={id}
      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 overflow-ellipsis hover:bg-gray-300 cursor-pointer"
    >
      {name}
    </div>
  );
};