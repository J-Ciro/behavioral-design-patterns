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
      <aside className="bg-[rgba(11,17,26,0.6)] backdrop-blur-md p-4 rounded-xl shadow-soft-glow h-full animate-fadeInUp">
        <h3 className="text-lg font-semibold mb-3 text-accent flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Historial de Guardados
        </h3>

        <p className="text-sm text-gray-300 mb-4">Carga un punto de control para regresar a esa escena.</p>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {checkpoints.length === 0 ? (
            <div className="p-4 rounded-md bg-[rgba(255,255,255,0.02)] text-gray-400 text-sm">Aún no tienes guardados. Usa "Guardar" para crear tu primer checkpoint.</div>
          ) : (
            checkpoints.map((memento, index) => {
              const state = memento.getState();
              return (
                <div
                  key={index}
                  className="p-3 bg-[rgba(255,255,255,0.02)] rounded-md flex justify-between items-center hover:scale-[1.01] transition-transform cursor-pointer"
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
                    <p className="font-medium text-white">{state.name}</p>
                    <p className="text-xs text-gray-400">Escena: {state.sceneId}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-xs rounded bg-accent text-black font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLoadCheckpoint(memento);
                      }}
                    >
                      Cargar
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    );
  }
);

CheckpointHistory.displayName = 'CheckpointHistory';

export default CheckpointHistory;
