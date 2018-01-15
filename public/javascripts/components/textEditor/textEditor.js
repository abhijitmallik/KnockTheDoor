import React,{Component} from 'react';
import "./textEditor.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
const options ={
  inline: {
    inDropdown: true
  },
  blockType:{
    inDropdown: true
  },
  list:{
    inDropdown: true
  },
  link:{
    inDropdown:true
  },
  history:{
    inDropdown:true
  }
};

export default class TextEditor extends Component{
	constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="text-editor">
        <Editor toolbar={options}
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}