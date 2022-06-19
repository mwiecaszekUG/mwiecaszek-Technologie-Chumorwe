
import './App.css';
import Todos from './components/Todos'
import DirectorForm from './components/DirectorForm'
import MovieForm from './components/MovieForm'
import MovieList from './components/MovieList'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <Navbar />
        <Todos />
          <Routes>
       <Route path="/directorForm" element={<DirectorForm />} />
       <Route path="/movieForm" element={<MovieForm props="tak" />} />
       <Route path="/movieList" element={<MovieList />} />
       </Routes>
       </Router>
      </header>
    </div>
  );
}

export default App;
