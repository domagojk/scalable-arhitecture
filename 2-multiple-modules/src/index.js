import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Todos, MarkdownFetcher } from './modules'

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/'>Markdown Fetcher</Link></li>
        <li><Link to='/todos'>Todos</Link></li>
      </ul>

      <hr />

      <Route exact path='/' component={MarkdownFetcher} />
      <Route path='/todos' component={Todos} />
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))
