import './App.css'
import { API_CONFIG } from './config'

function App() {
  return (
    <main>
      <section>
        <h1>MarketPlace</h1>

        <p>
          API Backend :{' '}
          <a
            href={API_CONFIG.baseUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {API_CONFIG.baseUrl}
          </a>
        </p>

        <p>
          Configuration API : <strong>OK</strong>
        </p>
      </section>
    </main>
  )
}

export default App