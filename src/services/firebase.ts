import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

export interface FirebaseClient {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  storage: FirebaseStorage | null;
  isConfigured: boolean;
}

let firebaseClient: FirebaseClient = {
  app: null,
  auth: null,
  db: null,
  storage: null,
  isConfigured: false,
};

export function initFirebase(config?: any): FirebaseClient {
  try {
    const savedConfig = config || JSON.parse(localStorage.getItem('my_school_firebase_config') || '{}');
    if (savedConfig && savedConfig.apiKey && savedConfig.projectId) {
      const app = getApps().length === 0 ? initializeApp(savedConfig) : getApp();
      firebaseClient = {
        app,
        auth: getAuth(app),
        db: getFirestore(app),
        storage: getStorage(app),
        isConfigured: true,
      };
      return firebaseClient;
    }
  } catch (error) {
    console.warn('Firebase initialization skipped or failed:', error);
  }

  firebaseClient = {
    app: null,
    auth: null,
    db: null,
    storage: null,
    isConfigured: false,
  };
  return firebaseClient;
}

export function getFirebaseClient(): FirebaseClient {
  if (!firebaseClient.isConfigured) {
    initFirebase();
  }
  return firebaseClient;
}
