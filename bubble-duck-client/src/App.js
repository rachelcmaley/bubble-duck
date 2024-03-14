import './styles/main.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { PhotoUpload }from './components/photoUpload';
import { GetRecommendations } from './components/getRecommendations';
import { LandingPage } from './components/landingPage';
import { Header } from './components/header'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<><Header /><Outlet /></>}>
          <Route path='/photo-upload' element={<PhotoUpload />} />
          <Route path='/get-recommendations' element={<GetRecommendations /> } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;