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
    uid: 'USR-ADMIN-01',
    email: 'admin@school.edu.kh',
    displayName: 'លោកនាយក គង់ វឌ្ឍនា (Admin)',
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phone: '012 889 456'
  },
  {
    uid: 'USR-DIR-02',
    email: 'director@school.edu.kh',
    displayName: 'នាយករង ម៉ៅ សុផល (Director)',
    role: 'SCHOOL_DIRECTOR',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '017 334 455'
  },
  {
    uid: 'USR-TCH-01',
    email: 'samnang.keo@school.edu.kh',
    displayName: 'លោកគ្រូ កែវ សំណាង (Teacher)',
    role: 'TEACHER',
    teacherId: 'T-001',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    phone: '012 889 456'
  },
  {
    uid: 'USR-ATT-01',
    email: 'attendance@school.edu.kh',
    displayName: 'បុគ្គលិកស្រង់វត្តមាន (Staff)',
    role: 'ATTENDANCE_STAFF',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    phone: '097 555 123'
  }
];

class AuthService {
  private currentUser: UserProfile;

  constructor() {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
      } catch {
        this.currentUser = DEFAULT_USERS[0];
      }
    } else {
      this.currentUser = DEFAULT_USERS[0]; // Default to Admin for complete preview
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

