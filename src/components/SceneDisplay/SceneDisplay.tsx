import React, { FC, memo } from 'react';
import { ChevronRight } from 'lucide-react';
import type { Scene } from '../../types';

interface SceneDisplayProps {
  scene: Scene;
  isFinished: boolean;
  onChoiceSelect: (nextStepId: number) => void;
}

/**
 * SceneDisplay - Componente presentacional
 * Responsabilidad: Mostrar la escena actual y sus opciones
 * 
 * Principio SOLID:
 * - Single Responsibility: Solo renderiza la escena
 * - Interface Segregation: Props claramente definidas
 * - Memoization: Optimizado para re-renders
 */
const SceneDisplay: FC<SceneDisplayProps> = memo(
  ({ scene, isFinished, onChoiceSelect }) => {
    return (
      <div className="bg-gray-800/80 backdrop-blur-md p-6 sm:p-8 rounded-lg text-white space-y-6">
        {/* Título y ID */}
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wide">
            {scene.title}
          </h2>
          <div className="inline-block bg-gray-700/50 text-gray-300 text-sm px-3 py-1 rounded-full mt-2">
            Escena ID: {scene.id}
          </div>
        </div>

        {/* Imagen */}
        {scene.imageUrl && (
          <div className="aspect-video bg-gray-900 rounded-md overflow-hidden flex items-center justify-center w-3/4 mx-auto">
            <img
              src={scene.imageUrl}
              alt={scene.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`Error cargando imagen: ${scene.imageUrl}`);
              }}
            />
          </div>
        )}

        {/* Descripción */}
        <p className="text-gray-300 text-base sm:text-lg">
          {scene.storyText}
        </p>

        {/* Opciones */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-yellow-500">Opciones:</h3>
          <div className="space-y-3">
            {scene.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => onChoiceSelect(choice.nextStepId)}
                className={`w-full flex items-center gap-4 text-left p-4 rounded-md transition-all duration-300 shadow-md transform hover:scale-[1.02] ${
                  choice.nextStepId === 999
                    ? 'bg-red-700/60 hover:bg-red-600'
                    : 'bg-gray-700/60 hover:bg-yellow-500 hover:text-gray-900'
                }`}
              >
                <ChevronRight className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium">{choice.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

SceneDisplay.displayName = 'SceneDisplay';

export default SceneDisplay;
