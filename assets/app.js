import { createRoot } from 'react-dom/client';
import App from './src/App';

try {
    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
} catch (error) {
    console.error('Erreur React:', error);
    document.getElementById('root').innerHTML = `
    <h1 style="color:red;padding:20px;">
      Erreur d'initialisation : ${error.message}
    </h1>
  `;
}