import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Code Splitting using React.lazy
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));

function App() {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    return (
        <Router>
            <div className="App">
                <header>
                    <h1>MERN Deployment Demo</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </nav>
                    <p>Backend API: {apiUrl}</p>
                </header>

                <main>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

// Simple placeholder components to make the lazy load work without extra files
// In a real app, these would be in separate files
function HomeComp() {
    return <h2>Home Page</h2>;
}
// We mock the import for the demo if files don't exist, but for the assignment requirements
// I will create the actual files in the next step to ensure the build passes.

export default App;
