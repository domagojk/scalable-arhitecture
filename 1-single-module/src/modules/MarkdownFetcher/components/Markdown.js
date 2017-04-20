import React from 'react'
import ReactMarkdown from 'react-markdown'

const Markdown = (props) => (
  <div>
    {props.error &&
      <div>
        <div>Error fetching document: {props.error}</div>
        <button onClick={props.onRetry}>Retry</button>
      </div>
    }
    <ReactMarkdown source={props.document} />
  </div>
)

export default Markdown
