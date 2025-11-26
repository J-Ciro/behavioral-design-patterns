import { useState, useEffect } from 'react';
import { AuthenticationService } from '../services';
import type { AuthUser, FirebaseConfig } from '../types';

/**
 * Hook personalizado para gestionar autenticación
 * 
 * Principio SOLID:
 * - Single Responsibility: Solo gestiona autenticación
 * - Dependency Inversion: Usa la interfaz AuthenticationService
 */
export const useAuthentication = (firebaseConfig: FirebaseConfig) => {
  const [authService] = useState(
    () => new AuthenticationService(firebaseConfig)
  );
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Intenta autenticarse anónimamente
        authService
          .signInAnonymously()
          .then((authenticatedUser) => {
            setUser(authenticatedUser);
          })
          .catch((err) => {
            setError('Error en autenticación anónima');
            console.error(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });

    return () => unsubscribe();
  }, [authService]);

  return { user, loading, error, authService };
};
