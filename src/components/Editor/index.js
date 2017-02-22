import React from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

function Editor () {
  var options = {
    mode: 'javascript',
    lineNumbers: true
  }

  return (
    <CodeMirror value={'test'} options={options} />
  )
}

export default Editor
