import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import SubmitPage from './pages/SubmitPage';
import ConceptsPage from './pages/ConceptsPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'submit':
        return <SubmitPage />;
      case 'concepts':
        return <ConceptsPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;
