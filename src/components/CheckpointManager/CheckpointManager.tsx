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
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-teal-600">
        <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center">
          <Save className="w-5 h-5 mr-2" />
          Guardar Progreso (Memento)
        </h3>

        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Nombre del punto de guardado (Ej: Antes del Puente)"
            disabled={isFinished}
            className="flex-grow p-2 border border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-gray-700 text-white placeholder-gray-400 disabled:opacity-50 transition"
          />
          <button
            type="submit"
            disabled={isFinished}
            className="flex-shrink-0 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors flex items-center disabled:opacity-50"
          >
            <Bookmark className="w-5 h-5 mr-2" />
            Guardar
          </button>
        </form>

        <button
          onClick={onReset}
          className="w-full mt-3 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors flex items-center justify-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reiniciar Aventura
        </button>
      </div>
    );
  }
);

CheckpointManager.displayName = 'CheckpointManager';

export default CheckpointManager;
