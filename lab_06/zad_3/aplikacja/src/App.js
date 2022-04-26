import './App.css';
import HomePage from './ui/HomePage';
import { BrowserRouter, Route } from 'react-router-dom';
import { useState } from 'react';
import PlayingRoom from './ui/PlayingRoom';
import RoomSelection from './ui/RoomSelection';
import MysteryForm from './ui/MysteryForm';
import Navbar from './ui/Navbar';
import MysteryList from './ui/MysteryList';
import Profile from './ui/Profile';
import Leaderboard from './ui/Leaderboard';
import { useEffect } from 'react'
import LoginForm from './functions/LoginForm';
import axios from "axios"
import Comments from './ui/Comments';

function App() {


  const mqtt = require('mqtt')

  const [webClient, setWebClient] = useState(null)

  const topic = "app/messages"

  const [isCon, setIsCon] = useState(false)

  const [allPlayers, setAllPlayers] = useState([])

  useEffect(() => {

    axios.get('http://localhost:5000/users').then((response) => {
        setAllPlayers(response.data)
    })

    if (! isCon) {
      const client = mqtt.connect("http://localhost:8000/mqtt")
    setWebClient(client)

    
    client.on("connect", () => {
      client.subscribe(topic)
    })

    
    client.on("close", () => {
      console.log("disconnected");
    })
    setIsCon(true)
    }
    
  }, [mqtt, isCon])

  return (
    <div className="App">
      <BrowserRouter>
      <header className="App-header">
      <Route path="/:cos">
        <Navbar />
        </Route>
        <Route exact path="/home">
        <HomePage client={webClient}  />
        </Route>
        <Route exact path ="/">
        <LoginForm client={webClient} />
        </Route>
        <Route exact path="/rooms">
          <RoomSelection client={webClient} />
        </Route>
        <Route path="/rooms/:id">
          <PlayingRoom client={webClient} />
        </Route>
        <Route path="/form/:id">
          <MysteryForm />
        </Route>
        <Route path="/list">
          <MysteryList />
        </Route>
        <Route path="/riddles/:id">
          <Comments client={webClient} />
        </Route>
        <Route path="/profile">
          <Profile client={webClient} />
        </Route>
        <Route path="/Leaderboard">
          <Leaderboard client={webClient} allPlayers={allPlayers} />
        </Route>
      </header>
      </BrowserRouter>
    </div>
  );
}

export default App;

