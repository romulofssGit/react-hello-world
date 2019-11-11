import React from 'react';
import Routes from './routes'
import Header from './components/Header/index'
import './style.css';

const App = () => (
      <div className="App">
        <Header/>
        <Routes/>
      </div>
);


// class App extends Component {
//   render() {
//     return ();
//   }
// }

export default App;
