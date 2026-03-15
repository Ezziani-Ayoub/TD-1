import { useState } from 'react';
import styles from './ProjectForm.module.css';

interface ProjectFormProps {
  submitLabel: string;
  onSubmit: (name: string, color: string) => void;
  onCancel: () => void;
}

export default function ProjectForm({ submitLabel, onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim(), color);
      setName('');
      setColor('#000000');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom du projet"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <div className={styles.buttons}>
        <button type="submit">{submitLabel}</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}