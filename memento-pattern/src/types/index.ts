/**
 * Tipos y interfaces principales de la aplicación
 * Principio SOLID: Aplicamos Dependency Inversion mediante interfaces
 */

export interface Choice {
  readonly text: string;
  readonly nextStepId: number;
}

export interface Scene {
  readonly id: number;
  readonly title: string;
  readonly storyText: string;
  readonly choices: readonly Choice[];
  readonly imageUrl?: string;
}

export interface SceneState {
  readonly index: number;
  readonly sceneId: number;
  readonly timestamp: string;
  readonly name: string;
}

export interface FirebaseConfig {
  readonly apiKey?: string;
  readonly authDomain?: string;
  readonly projectId?: string;
  readonly storageBucket?: string;
  readonly messagingSenderId?: string;
  readonly appId?: string;
}

export interface AuthUser {
  readonly uid: string;
  readonly isAnonymous: boolean;
}
