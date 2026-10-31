import { UserProfile, UserRole } from '../types';
import { getFirebaseClient } from './firebase';
import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged
} from 'firebase/auth';

const CURRENT_USER_KEY = 'msts_current_user';

export const DEFAULT_USERS: UserProfile[] = [
  {
    uid: 'USR-KS-01',
    email: 'samnang.keo@school.edu.kh',
    displayName: 'លោកគ្រូ កែវ សំណាង (គណិតវិទ្យា)',
    role: 'ADMIN',
    teacherId: 'T-001',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    phone: '012 889 456'
  }
];

class AuthService {
  private currentUser: UserProfile;

  constructor() {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.teacherId === 'T-001' || parsed.email === 'samnang.keo@school.edu.kh') {
          this.currentUser = parsed;
        } else {
          this.currentUser = DEFAULT_USERS[0];
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(this.currentUser));
        }
      } catch {
        this.currentUser = DEFAULT_USERS[0];
      }
    } else {
      this.currentUser = DEFAULT_USERS[0];
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(this.currentUser));
    }
  }

  public getCurrentUser(): UserProfile {
    return this.currentUser;
  }

  public setCurrentUser(user: UserProfile): void {
    this.currentUser = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  public switchRole(role: UserRole): UserProfile {
    const match = DEFAULT_USERS.find(u => u.role === role) || {
      ...this.currentUser,
      role
    };
    this.setCurrentUser(match);
    return match;
  }

  public async loginWithFirebase(email: string, pass: string): Promise<UserProfile> {
    const { auth, isConfigured } = getFirebaseClient();
    if (isConfigured && auth) {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const user: UserProfile = {
        uid: cred.user.uid,
        email: cred.user.email || email,
        displayName: cred.user.displayName || email.split('@')[0],
        role: 'ADMIN'
      };
      this.setCurrentUser(user);
      return user;
    }
    // Fallback: match by email from default users
    const match = DEFAULT_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (match) {
      this.setCurrentUser(match);
      return match;
    }
    const genericUser: UserProfile = {
      uid: 'USR-' + Date.now(),
      email,
      displayName: email.split('@')[0],
      role: 'TEACHER'
    };
    this.setCurrentUser(genericUser);
    return genericUser;
  }

  public async logout(): Promise<void> {
    const { auth, isConfigured } = getFirebaseClient();
    if (isConfigured && auth) {
      await fbSignOut(auth);
    }
    this.setCurrentUser(DEFAULT_USERS[0]);
  }
}

export const authService = new AuthService();

