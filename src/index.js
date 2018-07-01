import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class From extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key_code: ""
    };
  }

  handleKeyChange(event) {
    let newState = Object.assign({}, this.state);
    let possibleKeys = ["key_code", "consumer_key_code", "pointing_button", "any"];
    for (let key of possibleKeys) {
      if (key !== event.target.value) {
        newState[key] = null;
      } else if (key === "any") {
        newState[key] = "key_code";
      } else {
        newState[key] = "";
      }
    }
    console.log(JSON.stringify(newState));
    this.setState(newState);
  }

  handleAnyKeyChange(event) {
    let newState = Object.assign({}, this.state);
    newState.any = event.target.value;
    this.setState(newState);
  }

  updateKeyCode(event) {
    let newState = Object.assign({}, this.state);
    let possibleKeys = ["key_code", "consumer_key_code", "pointing_button", "any"];
    for (let key of possibleKeys) {
      if (this.state[key] != null) {
        newState[key] = event.target.value;
      }
    }
    this.setState(newState);
  }

  render() {
    console.log(JSON.stringify(this.state));
    let actualKey = "";
    let possibleKeys = ["key_code", "consumer_key_code", "pointing_button", "any"];
    for (let key of possibleKeys) {
      if (this.state[key] != null) {
        actualKey = key;
      }
    }

    let keyInput = null;
    if (actualKey === "any") {
      keyInput = (
        <select className="form-select" onChange={this.handleAnyKeyChange.bind(this)} >
          <option value="key_code">Key Code</option>
          <option value="consumer_key_code">Consumer Key Code</option>
          <option value="pointing_button">Pointing Button</option>
        </select>
      )
    } else {
      keyInput =
        <input
          className="form-input"
          placeholder="Key code"
          value={this.state[actualKey].key}
          onChange={this.updateKeyCode.bind(this)}
        />
    }
    return (
      <div className="from outlined">
        <h3>From</h3>
        <select className="form-select" onChange={this.handleKeyChange.bind(this)}>
          <option value="key_code">Key Code</option>
          <option value="consumer_key_code">Consumer Key Code</option>
          <option value="pointing_button">Pointing Button</option>
          <option value="any">Any</option>
        </select>
        {keyInput}
      </div>
    )
  }
}

class Manipulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
    };
  }

  handleDescriptionChange(event) {
    let newState = Object.assign({}, this.state);
    newState.description = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div className="manipulator outlined">
        <button className="delete-button" onClick={this.props.delete}>&times;</button>
        <h3>Manipulator</h3>
        <label className="form-label">Description</label>
        <input
          className="form-input"
          value={this.state.description}
          placeholder="Manipulator description"
          onChange={this.handleDescriptionChange.bind(this)}
        /><br/>
        <From />
      </div>
    )
  }
}

class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      manipulators: [Date.now().toString(10)]
    };
  }

  handleDescriptionChange(event) {
    let newState = Object.assign(this.state, {description: event.target.value});
    this.setState(newState);
  }

  addManipulator() {
    let manipulators = this.state.manipulators.slice();
    manipulators.push(Date.now().toString(10));
    this.setState(Object.assign(this.state, {manipulators: manipulators}));
  }

  deleteManipulator(key) {
    let newManipulators = this.state.manipulators.slice();
    const index = newManipulators.indexOf(key);
    if (index !== -1) {
      newManipulators.splice(index, 1);
    }
    this.setState(Object.assign(this.state, {manipulators: newManipulators}));
  }

  render() {
    let manipulators = [];
    for (let key of this.state.manipulators) {
      manipulators.push(<li key={key}><Manipulator delete={this.deleteManipulator.bind(this, key)} /></li>);
    }
    return (
      <div className="rule outlined">
        <button className="delete-button" onClick={this.props.delete}>&times;</button>
        <h3>Rule</h3>
        <label className="form-label">Description</label>
        <input
          className="form-input"
          value={this.state.description}
          placeholder="Rule description"
          onChange={this.handleDescriptionChange.bind(this)}
        /><br/>
        <ul>{manipulators}</ul><br/>
        <button className="form-button" onClick={this.addManipulator.bind(this)}>Add Manipulator</button>
      </div>
    );
  }
}

class CustomMapping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      rules: [Date.now().toString(10)]
    };
  }

  addRule() {
    let newRules = this.state.rules.slice();
    newRules.push(Date.now().toString(10));
    this.setState(Object.assign(this.state, {rules: newRules}));
  }

  deleteRule(key) {
    let newRules = this.state.rules.slice();
    const index = newRules.indexOf(key)
    if (index !== -1) {
      newRules.splice(index, 1);
    }
    this.setState(Object.assign(this.state, {rules: newRules}));
  }

  handleTitleChange(event) {
    let newState = Object.assign(this.state, {title: event.target.value});
    this.setState(newState);
  }

  render() {
    let rules = [];
    for(let key of this.state.rules) {
      rules.push(
        <li key={key}>
          <Rule delete={this.deleteRule.bind(this, key)} />
        </li>
      );
    }
    return (
      <div className="custom-mapping outlined">
        <h3>Custom Complex Mapping</h3>
        <label className="form-label">Title</label>
        <input
          className="form-input"
          value={this.state.title}
          placeholder="Mapping title"
          onChange={this.handleTitleChange.bind(this)}
        /><br/>
        <ul>{rules}</ul>
        <button onClick={this.addRule.bind(this)}>Add Rule</button>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <CustomMapping />,
  document.getElementById('root')
);
