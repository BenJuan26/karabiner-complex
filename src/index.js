import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleDescriptionChange(event) {
    let newState = Object.assign(this.state, {description: event.target.value});
    this.setState(newState);
  }

  render() {
    return (
      <div className="rule outlined">
        <label className="form-label">Description</label>
        <input
          className="form-input"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <button className="delete-button" onClick={() => this.props.delete(this.props.index)} >
          &times;
        </button>
      </div>
    );
  }
}

class CustomMapping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Custom Title",
      rules: []
    };

    this.updateRule = this.updateRule.bind(this);
    this.addRule = this.addRule.bind(this);
    this.deleteRule = this.deleteRule.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  updateRule(i, rule) {
    let newRules = this.state.rules.slice();
    newRules[i] = rule;
    newRules[i].description = "New Rule!";
    let newState = Object.assign(this.state, {rules: newRules});
    this.setState(newState);
  }

  addRule() {
    let newRules = this.state.rules.slice();
    let rule = {description: "New Rule"};
    newRules.push(rule);
    let newState = Object.assign(this.state, {rules: newRules});
    this.setState(newState);
  }

  deleteRule(i) {
    let newRules = this.state.rules.slice();
    newRules.splice(i, 1);
    let newState = Object.assign(this.state, {rules: newRules});
    this.setState(newState);
  }

  handleTitleChange(event) {
    let newState = Object.assign(this.state, {title: event.target.value});
    this.setState(newState);
  }

  render() {
    const rules = this.state.rules.map((rule, i) =>
      <li><Rule state={rule} index={i} update={this.updateRule} delete={this.deleteRule} /></li>
    );
    return (
      <div className="custom-mapping outlined">
        <label className="form-label">Title</label><input className="form-input" value={this.state.title} onChange={this.handleTitleChange} /><br/>
        <ul>{rules}</ul>
        <button onClick={this.addRule}>Add Rule</button>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <CustomMapping />,
  document.getElementById('root')
);
