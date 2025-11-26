import React, { FC } from 'react';
import { BookOpen } from 'lucide-react';
import SceneDisplay from '../SceneDisplay';
// CheckpointManager removed from top-level to avoid duplicate save UI; using BottomSaveBar
import CheckpointHistory from '../CheckpointHistory';
import BottomSaveBar from '../BottomSaveBar/BottomSaveBar';
import { useAdventure, useAuthentication } from '../../hooks';
import { ADVENTURE_SCENES } from '../../config/adventureScenes';
import { getFirebaseConfig } from '../../config/firebase';

/**
 * AdventureGame - Componente principal
 * Orquesta todos los componentes y patrones
 * 
 * Principio SOLID:
 * - Composition: Compone componentes más pequeños
 * - Dependency Injection: Inyecta dependencias a través de props y hooks
 * - Single Responsibility: Organiza la aventura
 */
const AdventureGame: FC = () => {
  // Inyectar dependencias
  const firebaseConfig = getFirebaseConfig();
  
  // Verificar si Firebase está configurado
  const isFirebaseConfigured = firebaseConfig.projectId ? true : false;
  
  // useAuthentication solo si Firebase está configurado
  const authResult = isFirebaseConfigured ? useAuthentication(firebaseConfig) : null;
  const { user } = authResult || { user: null };
  
  const {
    currentScene,
    savedCheckpoints,
    selectChoice,
    saveCheckpoint,
    loadCheckpoint,
    resetAdventure,
    checkpointCount,
  } = useAdventure(ADVENTURE_SCENES);

  const isFinished = currentScene.id === 999;

  const handleSaveCheckpoint = (name: string) => {
    saveCheckpoint(name);
  };

  const handleLoadCheckpoint = (memento: any) => {
    loadCheckpoint(memento);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat font-sans text-white"
      style={{
        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYZwQlVkmVjHWfuzOgj4rUSL8H0RpFWh1-2XVILv0FNFsyKHLWFkv0FQpt1NNoPMfrCfkN6u9xuMpiXzaDhmef3JbuOkacue8a4mjqgjIs5M3g76u_b02KFw--zGJBi_jdy_MbNfewVJxVidsM2ewqJgbfk82RIlKUy9J7yt0a9ALQpcuAfKyeX8fZXxI0HGum5pN0wVq3LBjAQcnQtCsvdMcMyTNjp_YP2B-I7P01avKoFJ6Wtsixg-lOhuN2XOA-a5CK4vk6qX0')`
      }}
    >
      {/* Overlay oscuro */}
      <div className="min-h-screen bg-black/50 backdrop-blur-sm p-4 sm:p-8">
        {/* Encabezado */}
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2 flex items-center">
          <BookOpen className="w-7 h-7 mr-3 text-yellow-500" />
          Elige Tu Propia Aventura
        </h1>

        <p className="text-sm text-gray-400 mb-6">
          Patrones: <strong>Iterator</strong> (navegación entre escenas) y{' '}
          <strong>Memento</strong> (guardar posición).
        </p>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna 1-2: Escena (ahora sin duplicar el form de guardado) */}
          <div className="lg:col-span-2 space-y-6">
            <SceneDisplay
              scene={currentScene}
              isFinished={isFinished}
              onChoiceSelect={selectChoice}
            />
          </div>

          {/* Columna 3: Historial */}
          <div className="lg:col-span-1">
            <CheckpointHistory
              checkpoints={savedCheckpoints}
              onLoadCheckpoint={handleLoadCheckpoint}
            />
          </div>
        </div>

        {/* Pie de página */}
        <p className="mt-8 text-xs text-gray-500 text-center">
          ID de Usuario: {user?.uid || 'N/A'}. La lógica de la aventura opera
          100% en el cliente, usando los patrones Memento e Iterator.
        </p>
        {/* Bottom save bar */}
        <BottomSaveBar onSave={handleSaveCheckpoint} />
      </div>
    </div>
  );
};

export default AdventureGame;
