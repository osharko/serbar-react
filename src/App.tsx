import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Homepage } from './homepage/Home';

// BASE_URL segue il `base` di Vite: "/" in produzione su dominio custom,
// "/serbar-react/" per l'anteprima su GitHub Pages.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
