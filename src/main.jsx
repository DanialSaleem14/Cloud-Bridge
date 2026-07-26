import React from 'react'
import ReactDOM from 'react-dom/client'

// Global layer FIRST — tokens -> reset -> layout primitives -> shared buttons.
// It must be imported before App so that per-component stylesheets (which are
// imported by the components themselves) win the cascade on equal specificity.
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/buttons.css'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
