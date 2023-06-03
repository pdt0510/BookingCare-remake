import React, { Component } from 'react';
import './Markdown.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();
class Markdown extends Component {
 state = {
  htmlContent: '',
  textContent: '',
 };

 componentDidUpdate = (prevProps, prevState) => {
  const { isReset } = this.props;
  if (isReset !== prevProps.isReset) {
   this.resetMarkdown();
  }
 };

 handleEditor = ({ html, text }) => {
  this.props.getMarkdownContent({ html, text });
  this.setState({
   htmlContent: html,
   textContent: text,
  });
 };

 renderMdEditor = () => {
  return (
   <MdEditor
    value={this.state.textContent}
    renderHTML={(htmlStr) => mdParser.render(htmlStr)}
    onChange={this.handleEditor}
   />
  );
 };

 resetMarkdown = () => {
  this.setState({
   htmlContent: '',
   textContent: '',
  });
 };

 render() {
  this.props.resetState && this.resetMarkdown();

  return <div className='markdown-content'>{this.renderMdEditor()}</div>;
 }
}

export default Markdown;
