import React, { FC, useState } from 'react';

interface BottomSaveBarProps {
  onSave: (name: string) => void;
}

const BottomSaveBar: FC<BottomSaveBarProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const suggested = `Refugio en Ruinas • ${new Date().toLocaleTimeString()}`;

  const handleSave = () => {
    const finalName = name.trim() || suggested;
    onSave(finalName);
    setName('');
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl z-40">
      <div className="bg-[rgba(17,24,39,0.9)] rounded-xl p-3 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            className="text-sm text-gray-300 px-3 py-1 rounded-md bg-transparent"
          >
            {open ? 'Cerrar' : 'Guardar progreso'}
          </button>

          <div className="flex-1 mx-3">
            {open && (
              <div className="flex items-center gap-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={suggested}
                  className="flex-1 bg-transparent border border-gray-700 rounded-md px-3 py-2 text-sm placeholder:text-gray-500 outline-none"
                />
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-accent text-black rounded-md font-semibold"
                >
                  Guardar
                </button>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-400">Autosave: Off</div>
        </div>
      </div>
    </div>
  );
};

export default BottomSaveBar;
