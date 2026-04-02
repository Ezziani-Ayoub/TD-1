import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import api from '../../api/axios';
import styles from './Login.module.css';

interface LocationState {
  from?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useAuth();

  const locationState = location.state as LocationState | null;
  const from = locationState?.from || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirection sécurisée après login ou si user déjà connecté
  useEffect(() => {
    if (state.user) {
      navigate(from, { replace: true });
    }
  }, [state.user, navigate, from]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const { data: users } = await api.get(`/users?email=${email}`);
      if (users.length === 0 || users[0].password !== password) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Email ou mot de passe incorrect' });
        return;
      }
      const user = { ...users[0] };
      delete user.password; // Supprime le mot de passe
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur serveur' });
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>TaskFlow</h1>
        <p className={styles.subtitle}>Connectez-vous pour continuer</p>
        {state.error && <div className={styles.error}>{state.error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button} disabled={state.loading}>
          {state.loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}