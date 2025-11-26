import { useEffect, useState } from 'react';
import { DatabaseService } from '../database';

/**
 * Hook useDatabase
 * Inicializa la base de datos y ejecuta migraciones automáticamente
 * Se ejecuta una sola vez cuando la app carga
 */
export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const dbService = DatabaseService.getInstance();
        await dbService.initialize();

        // Log estadísticas de la BD
        const stats = dbService.getStats();
        console.log(`📊 Base de datos lista:`, stats);

        setIsInitialized(true);
        setError(null);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error('Error inicializando base de datos:', error);
        setError(error);
        setIsInitialized(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDatabase();
  }, []);

  return {
    isInitialized,
    isLoading,
    error,
    db: DatabaseService.getInstance(),
  };
};
