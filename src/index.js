import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class From extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  handleKeyChange(event) {
    let newState = Object.assign({}, this.state);
    let possibleKeys = ["key_code", "consumer_key_code", "pointing_button", "any"];
    for (let key of possibleKeys) {
      if (key !== event.target.value) {
        console.log("Deleting " + key);
        // delete newState[key];
        newState[key] = null;
      } else if (key === "any") {
        console.log("Adding " + key);
        newState[key] = {key: "key_code"};
      } else {
        console.log("Adding " + key);
        newState[key] = {key: ""};
      }
    }
    console.log(JSON.stringify(newState));
    this.setState(newState, () => console.log(JSON.stringify(this.state)));
  }

  render() {
    let keyInput = null;
    if (this.state.any) {
      keyInput = (
        <select>
          <option value="key_code">Key Code</option>
          <option value="consumer_key_code">Consumer Key Code</option>
          <option value="pointing_button">Pointing Button</option>
        </select>
      )
    } else {
      keyInput = <input className="form-input" placeholder="Key code" />
    }
    return (
      <div className="from outlined">
        <h3>From</h3>
        <select onChange={this.handleKeyChange.bind(this)}>
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
    this.state = props.state;
  }

  render() {
    return (
      <div className="manipulator outlined">
        <h3>Manipulator</h3>
        <label className="form-label">Description</label>
        <input className="form-input" value={this.state.description} /><br/>
        <From state={this.props.state} />
      </div>
    )
  }
}

class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  handleDescriptionChange(event) {
    let newState = Object.assign(this.state, {description: event.target.value});
    this.setState(newState, () =>
      this.props.update(this.props.listKey, this.state)
    );
    
  }

  updateManipulator(key, manipulator) {
    let manipulators = Object.assign({}, this.manipulators);
    manipulators[key] = manipulator;
    let newState = Object.assign(this.state, {manipulators: manipulators});
    this.setState(newState);
  }

  render() {
    let manipulators = [];
    for (let key in this.state.manipulators) {
      manipulators.push(<li key={key}><Manipulator state={this.state.manipulators[key]} /></li>)
    }
    return (
      <div className="rule outlined">
        <h3>Rule</h3>
        <button className="delete-button" onClick={() => this.props.delete(this.props.listKey)} >
          &times;
        </button>
        <label className="form-label">Description</label>
        <input
          className="form-input"
          value={this.state.description}
          onChange={this.handleDescriptionChange.bind(this)}
        /><br/>
        <ul>{manipulators}</ul>
      </div>
    );
  }
}

class CustomMapping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Custom Title",
      rules: {}
    };
    let manipulators = {};
    manipulators[Date.now()] = {
      description: "New Manipulator"
    };
    this.state.rules[Date.now()] = {
      description: "New Rule",
      manipulators: manipulators
    };
  }

  updateRule(key, rule) {
    console.log("Updating key " + key);
    let newRules = Object.assign({}, this.state.rules);
    newRules[key] = rule;
    let newState = Object.assign(this.state, {rules: newRules});
    this.setState(newState);
  }

  addRule() {
    const ts = Date.now();
    let newRules = Object.assign({}, this.state.rules);
    let rule = {description: "New Rule", manipulators: []};
    newRules[ts] = rule;
    let newState = Object.assign(this.state, {rules: newRules});
    this.setState(newState);
  }

  deleteRule(key) {
    let newRules = Object.assign({}, this.state.rules);
    delete newRules[key];
    let newState = Object.assign(this.state, {rules: newRules});
    this.setState(newState);
  }

  handleTitleChange(event) {
    let newState = Object.assign(this.state, {title: event.target.value});
    this.setState(newState);
  }

  render() {
    let rules = [];
    for(let key in this.state.rules) {
      rules.push(
        <li key={key}>
          <Rule
            state={this.state.rules[key]}
            listKey={key}
            update={this.updateRule.bind(this)}
            delete={this.deleteRule.bind(this)}
          />
        </li>);
    }
    return (
      <div className="custom-mapping outlined">
        <h3>Custom Complex Mapping</h3>
        <label className="form-label">Title</label>
        <input
          className="form-input"
          value={this.state.title}
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
