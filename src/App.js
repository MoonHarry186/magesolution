import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {publicRoutes} from './routes'
import { DefaultLayout } from './components/Layout'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {publicRoutes.map((publicRoute, index) => {
            var Layout = publicRoute.layout ? publicRoute.layout : DefaultLayout;

            const Page = publicRoute.component
            return (
              <Route 
                key={publicRoute.id} 
                path={publicRoute.path} 
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }>
              </Route>
            )
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
