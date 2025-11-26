import React, { FC, memo } from 'react';
import { Star, RefreshCw } from 'lucide-react';
import type { ScenePositionMemento } from '../../patterns/memento';

interface CheckpointHistoryProps {
  checkpoints: readonly ScenePositionMemento[];
  onLoadCheckpoint: (memento: ScenePositionMemento) => void;
}

/**
 * CheckpointHistory - Componente presentacional
 * Responsabilidad: Mostrar el historial de puntos guardados
 * 
 * Principio SOLID:
 * - Single Responsibility: Solo renderiza el historial
 * - Read-only Props: No modifica datos, solo presenta
 */
const CheckpointHistory: FC<CheckpointHistoryProps> = memo(
  ({ checkpoints, onLoadCheckpoint }) => {
    return (
      <div className="bg-gray-700 p-6 rounded-xl shadow-xl h-full">
        <h3 className="text-xl font-bold mb-4 text-yellow-400 flex items-center">
          <Star className="w-5 h-5 mr-2 flex-shrink-0" />
          Historial de Guardados (Caretaker)
        </h3>

        <p className="text-sm text-gray-300 mb-4">
          Carga un punto de control para regresar a esa escena.
        </p>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {checkpoints.length === 0 ? (
            <p className="text-gray-400 italic text-sm">
              No hay puntos de guardado.
            </p>
          ) : (
            checkpoints.map((memento, index) => {
              const state = memento.getState();
              return (
                <div
                  key={index}
                  className="p-3 bg-gray-600 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-500 transition duration-150"
                  onClick={() => onLoadCheckpoint(memento)}
                  role="button"
                  tabIndex={0}
                  title={`Restaurar a la escena ${state.sceneId}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onLoadCheckpoint(memento);
                    }
                  }}
                >
                  <div>
                    <p className="font-semibold text-white">{state.name}</p>
                    <p className="text-xs text-gray-400">
                      Escena: {state.sceneId} ({state.timestamp})
                    </p>
                  </div>
                  <button
                    className="text-yellow-400 hover:text-yellow-300 transition flex-shrink-0"
                    aria-label="Cargar guardado"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
);

CheckpointHistory.displayName = 'CheckpointHistory';

export default CheckpointHistory;
