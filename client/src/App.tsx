import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [sounds, setSounds] = useState<string[]>([]);

  useEffect(() => {
    const importSounds = async () => {
      const soundFiles: string[] = ['sonido.ogg','BMTH.mp3'];
      const importedSounds = await Promise.all(soundFiles.map(file =>
        importSound(`./${file}`)
      ));
      setSounds(importedSounds);
    };

    importSounds();
  }, []);

  const importSound = async (path: string) => {
    try {
      const sound = await import(path);
      return sound.default;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div>
      {sounds.map((sound, index) => (
        <audio key={index} controls>
          <source src={sound} />
          <p>
            Tu navegador no es compatible con el audio HTML5.
          </p>
        </audio>
      ))}
    </div>
  );
}

export default App;