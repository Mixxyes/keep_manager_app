import {BrowserRouter as Router} from 'react-router-dom';

import AppHeader from './components/appHeader/AppHeader';
import AppMain from './components/appMain/AppMain';

function App() {

  return (
    <div>
      <Router>
        <AppHeader/>
        <AppMain/>
      </Router>
    </div>
  );
}

export default App;
