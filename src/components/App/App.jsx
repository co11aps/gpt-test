import { useState } from 'react';
import CompatibilityGenerator from '../CompatibilityGenerator/CompatibilityGenerator';
import HoroscopeGenerator from '../HoroscopeGenerator/HoroscopeGenerator';
import css from './App.module.css';

function App() {
  const [language, setLanguage] = useState('English');

  return (
    <div className={css.container}>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="Ukrainian">Ukrainian</option>
        <option value="English">English</option>
      </select>
      <HoroscopeGenerator language={language} />
      <CompatibilityGenerator language={language} />
    </div>
  );
}

export default App;
