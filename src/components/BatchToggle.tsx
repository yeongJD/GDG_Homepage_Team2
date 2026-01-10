interface BatchToggleProps {
  selectedGen: string;
  onSelect: (gen: string) => void;
}

function BatchToggle({ selectedGen, onSelect }: BatchToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const batches = ['5기', '4기', '3기', '2기', '1기'];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xl font-bold"
      >
        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-[50px] text-lg">
          {selectedGen} {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute top-[50px] left-0 bg-white
          w-[276px] h-auto py-6 rounded-[16px] 
          border border-[#D8D8D8] 
          shadow-[0px_1px_12px_0px_rgba(0,0,0,0.1)]
          flex flex-col justify-center items-start pl-8 gap-4
          z-50"
        >
          {batches.map((batch) => (
            <li 
              key={batch}
              onClick={() => {
                onSelect(batch);
                setIsOpen(false);
              }}
              className="cursor-pointer text-xl font-medium transition-colors
                text-gray-400 hover:text-black"
            >
              {batch}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BatchToggle;