import React, { FC, useState, memo } from 'react';
import { Save, RefreshCw, Bookmark } from 'lucide-react';

interface CheckpointManagerProps {
  isFinished: boolean;
  checkpointCount: number;
  onSaveCheckpoint: (name: string) => void;
  onReset: () => void;
}

/**
 * CheckpointManager - Componente para guardar puntos de control
 * Responsabilidad: Interfaz para guardar y reiniciar
 * 
 * Principio SOLID:
 * - Single Responsibility: Solo gestiona el guardado de puntos
 * - Controlled Component Pattern: Estado local mínimo
 */
const CheckpointManager: FC<CheckpointManagerProps> = memo(
  ({ isFinished, checkpointCount, onSaveCheckpoint, onReset }) => {
    const [inputName, setInputName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const name =
        inputName.trim() ||
        `Guardado Rápido ${checkpointCount + 1}`;
      onSaveCheckpoint(name);
      setInputName('');
    };

    return (
      <div className="bg-[rgba(11,17,26,0.6)] backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-soft-glow animate-fadeInUp">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg sm:text-xl font-semibold text-accent flex items-center">
            <Save className="w-5 h-5 mr-2" />
            Guardar Progreso
          </h3>
          <div className="text-xs text-gray-400">Mementos: {checkpointCount}</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Ej: Antes del Puente"
            disabled={isFinished}
            className="flex-1 px-3 py-2 bg-transparent border border-gray-700 rounded-md placeholder:text-gray-500 text-white outline-none focus:ring-2 focus:ring-accent/40"
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={isFinished}
              className="px-4 py-2 bg-accent text-black font-semibold rounded-md hover:brightness-105 transition"
            >
              <Bookmark className="w-4 h-4 mr-2 inline" />Guardar
            </button>
            <button
              type="button"
              onClick={onReset}
              className="px-3 py-2 bg-transparent border border-gray-700 text-gray-300 rounded-md hover:bg-gray-700/40 transition"
            >
              <RefreshCw className="w-4 h-4 inline mr-1" />Reiniciar
            </button>
          </div>
        </form>
      </div>
    );
  }
);

CheckpointManager.displayName = 'CheckpointManager';

export default CheckpointManager;
