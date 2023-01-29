import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'




function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  const [layout, setLayout] = useState('default')
  


  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  const handleChangeLayout = () => {
    setLayout(prevLayout => prevLayout === "default" ? "reversed" : "default")
  }


  const handleClearAllCode = () => {
    setHtml('')
    setCss('')
    setJs('')
  }

  const handleLogin = () => {
    window.location.href = "https://codepen.io/login"
  }

  return (
    <>
      <div className="toolbar">
      <button type="button" className="change-layout-btn" onClick={() => setLayout(prevLayout => prevLayout === "default" ? "reversed" : "default")}>
          <FontAwesomeIcon icon={faExchangeAlt} /> Change Layout
        </button>
        <button onClick={handleClearAllCode}>Clear All Code</button>
        <button onClick={handleLogin}>Login</button>
        
      </div>
      <div className={`pane top-pane ${layout}`}>
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
