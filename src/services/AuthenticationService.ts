import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  Auth,
} from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import type { FirebaseConfig, AuthUser } from '../types';

/**
 * AuthenticationService
 * Encapsula toda la lógica de autenticación con Firebase
 * 
 * Principio SOLID:
 * - Single Responsibility: Solo gestiona autenticación
 * - Dependency Inversion: Inyecta dependencias en lugar de crearlas
 */
export class AuthenticationService {
  private auth: Auth | null;
  private firestore: Firestore | null;

  constructor(config: FirebaseConfig) {
    try {
      if (this._isValidConfig(config)) {
        const app = initializeApp(config);
        this.auth = getAuth(app);
        this.firestore = getFirestore(app);
      } else {
        console.warn('Firebase config no válida. Usando modo sin autenticación.');
        this.auth = null;
        this.firestore = null;
      }
    } catch (error) {
      console.error('Error inicializando Firebase:', error);
      this.auth = null;
      this.firestore = null;
    }
  }

  /**
   * Valida que la configuración de Firebase sea válida
   */
  private _isValidConfig(config: FirebaseConfig): boolean {
    return !!(
      config.apiKey &&
      config.authDomain &&
      config.projectId &&
      config.appId
    );
  }

  /**
   * Obtiene el servicio Auth de Firebase
   */
  getAuth(): Auth | null {
    return this.auth;
  }

  /**
   * Obtiene el servicio Firestore
   */
  getFirestore(): Firestore | null {
    return this.firestore;
  }

  /**
   * Autentica el usuario de forma anónima
   */
  async signInAnonymously(): Promise<AuthUser | null> {
    if (!this.auth) return null;

    try {
      await signInAnonymously(this.auth);
      const user = this.auth.currentUser;
      return user
        ? { uid: user.uid, isAnonymous: user.isAnonymous }
        : null;
    } catch (error) {
      console.error('Error en autenticación anónima:', error);
      return null;
    }
  }

  /**
   * Autentica con token personalizado
   */
  async signInWithToken(token: string): Promise<AuthUser | null> {
    if (!this.auth) return null;

    try {
      await signInWithCustomToken(this.auth, token);
      const user = this.auth.currentUser;
      return user
        ? { uid: user.uid, isAnonymous: user.isAnonymous }
        : null;
    } catch (error) {
      console.error('Error en autenticación con token:', error);
      return null;
    }
  }

  /**
   * Observa cambios en el estado de autenticación
   */
  onAuthStateChanged(
    callback: (user: AuthUser | null) => void
  ): () => void {
    if (!this.auth) {
      callback(null);
      return () => {};
    }

    return onAuthStateChanged(this.auth, (firebaseUser) => {
      if (firebaseUser) {
        callback({
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
        });
      } else {
        callback(null);
      }
    });
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): AuthUser | null {
    if (!this.auth || !this.auth.currentUser) return null;
    return {
      uid: this.auth.currentUser.uid,
      isAnonymous: this.auth.currentUser.isAnonymous,
    };
  }
}
