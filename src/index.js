import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ToEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key_code: ""
    }
  }

  render() {
    return (
      <fieldset className="event">
        <legend>Event</legend>
        <button className="delete-button delete-button-float-right" onClick={this.props.delete} title="Delete Event">&times;</button>
        <select className="form-select">
          <option value="key_code">Key Code</option>
          <option value="consumer_key_code">Consumer Key Code</option>
          <option value="pointing_button">Pointing Button</option>
          <option value="shell_command">Shell Command</option>
          <option value="select_input_source">Select Input Source</option>
          <option value="set_variable">Set Variable</option>
        </select><input className="form-input" placeholder="Value" /><br/>
        <ModifierList type="to" />
        <input type="checkbox" className="form-checkbox"/><label>Lazy</label><br/>
        <input type="checkbox" className="form-checkbox" defaultChecked/><label>Repeat</label><br/>
        <input type="checkbox" className="form-checkbox"/><label>Halt</label><br/>
        <input type="number" className="form-input" min="0" defaultValue="0"/><label>Hold Down Milliseconds</label>
      </fieldset>
    )
  }
}

class ToEventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  addEvent() {
    let newEvents = this.state.events.slice();
    newEvents.push(Date.now().toString(10));
    this.setState(Object.assign(this.state, {events: newEvents}));
  }

  deleteEvent(key) {
    let newEvents = this.state.events.slice();
    const index = newEvents.indexOf(key);
    if (index !== -1) {
      newEvents.splice(index, 1);
    }
    this.setState(Object.assign(this.state, {events: newEvents}));
  }

  render() {
    let title = "";
    switch (this.props.type) {
      case "if_alone":
      title = "To If Alone";
      break;

      case "if_held_down":
      title = "To If Held Down";
      break;

      case "after_key_up":
      title = "To After Key Up";
      break;

      case "if_invoked":
      title = "To If Invoked";
      break;

      case "if_canceled":
      title = "To If Canceled";
      break;

      default:
      title = "To";
      break;
    }
    let events = [];
    for (let key of this.state.events) {
      events.push(<li key={key}><ToEvent delete={this.deleteEvent.bind(this, key)}/></li>)
    }
    return (
      <fieldset className="to">
        <legend>{title}</legend>
        <ul>{events}</ul>
        <button className="form-button" onClick={this.addEvent.bind(this)}>Add Event</button>
      </fieldset>
    )
  }
}

class Modifier extends React.Component {
  render() {
    let optionalMods = [];
    if (this.props.type === "mandatory" || this.props.type === "optional") {
      optionalMods.push(<option value="command">Command (Left or Right)</option>);
      optionalMods.push(<option value="control">Control (Left or Right)</option>);
      optionalMods.push(<option value="option">Option (Left or Right)</option>);
      optionalMods.push(<option value="shift">Shift (Left or Right)</option>);
      optionalMods.push(<option value="any">Any</option>);
    }
    return (
      <div>
        <select defaultValue="command">
          <option value="left_command">Left Command</option>
          <option value="left_control">Left Control</option>
          <option value="left_option">Left Option</option>
          <option value="left_shift">Left Shift</option>
          <option value="right_command">Right Command</option>
          <option value="right_control">Right Control</option>
          <option value="right_option">Right Option</option>
          <option value="right_shift">Right Shift</option>
          <option value="caps_lock">Caps Lock</option>
          <option value="fn">Function</option>
          {optionalMods}
        </select>
        <button className="delete-button" onClick={this.props.delete} title="Delete Modifier Key">&times;</button>
      </div>
    )
  }
}

class ModifierList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifiers: []
    }
  }

  addModifier() {
    let newModifiers = this.state.modifiers.slice();
    newModifiers.push(Date.now().toString(10));
    this.setState(Object.assign(this.state, {modifiers: newModifiers}));
  }

  deleteModifier(key) {
    let newModifiers = this.state.modifiers.slice();
    const index = newModifiers.indexOf(key);
    if (index !== -1) {
      newModifiers.splice(index, 1);
    }
    this.setState(Object.assign(this.state, {modifiers: newModifiers}));
  }

  render() {
    let prefix = "";
    if (this.props.type === "mandatory") {
      prefix = "Mandatory ";
    } else if (this.props.type === "optional") {
      prefix = "Optional ";
    }
    let heading = <legend>{prefix}Modifiers</legend>;
    let modifiers = [];
    for (let key of this.state.modifiers) {
      modifiers.push(<li key={key}><Modifier type={this.props.type} delete={this.deleteModifier.bind(this, key)} /></li>);
    }
    return (
      <fieldset className="modifier-list">
        {heading}
        <ul>{modifiers}</ul>
        <button onClick={this.addModifier.bind(this)}>Add Modifier</button>
      </fieldset>
    )
  }
}

class FromEvent extends React.Component {
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
      <fieldset className="from">
        <legend>From</legend>
        <select className="form-select" onChange={this.handleKeyChange.bind(this)}>
          <option value="key_code">Key Code</option>
          <option value="consumer_key_code">Consumer Key Code</option>
          <option value="pointing_button">Pointing Button</option>
          <option value="any">Any</option>
        </select>
        {keyInput}<br/>
        <ModifierList type="mandatory" /><br/>
        <ModifierList type="optional" /><br/>
        <button>Add Simultaneous</button><br/>
        <button>Add Simultaneous Options</button>
      </fieldset>
    )
  }
}

class Manipulator extends React.Component {
  handleDescriptionChange(event) {
    let newContent = Object.assign({}, this.props.content);
    newContent.description = event.target.value;
    this.props.onUpdate(this.props.id, newContent);
  }

  addTo() {

  }

  render() {
    return (
      <fieldset className="manipulator">
        <legend>Manipulator</legend>
        <button className="delete-button delete-button-float-right" onClick={this.props.delete} title="Delete Rule">&times;</button>
        <label className="form-label">Description</label>
        <input
          className="form-input"
          value={this.props.content.description}
          placeholder="Manipulator description"
          onChange={this.handleDescriptionChange.bind(this)}
        /><br/>
        <FromEvent /><br/>
        <ToEventList /><br/>
        <ToEventList type="if_alone" /><br/>
        <ToEventList type="if_held_down" /><br/>
        <ToEventList type="after_key_up" /><br/>
      </fieldset>
    )
  }
}

class Rule extends React.Component {
  handleDescriptionChange(event) {
    let newContent = Object.assign({}, this.props.content);
    newContent.description = event.target.value;
    this.props.onUpdate(this.props.id, newContent);
  }

  updateManipulator(id, manipulator) {
    let newContent = Object.assign({}, this.props.content);
    newContent.manipulators[id] = manipulator;
    this.props.onUpdate(this.props.id, newContent);
  }

  addManipulator() {
    let newContent = Object.assign({}, this.props.content);
    newContent.manipulators[Date.now().toString(10)] = newManipulator();
    this.props.onUpdate(this.props.id, newContent);
  }

  deleteManipulator(key) {
    let newContent = Object.assign({}, this.props.content);
    delete newContent.manipulators[key];
    this.props.onUpdate(this.props.id, newContent);
  }

  render() {
    let manipulators = [];
    for (const [key, value] of Object.entries(this.props.content.manipulators)) {
      manipulators.push(<li key={key}><Manipulator id={key} delete={this.deleteManipulator.bind(this, key)} onUpdate={this.updateManipulator.bind(this)} content={value}/></li>);
    }
    return (
      <fieldset className="rule">
        <legend>Rule</legend>
        <button className="delete-button delete-button-float-right" onClick={this.props.delete} title="Delete Rule">&times;</button>
        <label className="form-label">Description</label>
        <input
          className="form-input"
          value={this.props.content.description}
          placeholder="Rule description"
          onChange={this.handleDescriptionChange.bind(this)}
        /><br/>
        <ul>{manipulators}</ul><br/>
        <button className="form-button" onClick={this.addManipulator.bind(this)}>Add Manipulator</button>
      </fieldset>
    );
  }
}

function newManipulator() {
  return {
    description: "",
    to: false
  };
}

function newRule() {
  return {
    description: "",
    manipulators: {
      [Date.now().toString(10)]: newManipulator()
    }
  }
}

class CustomMapping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      rules: {
        [Date.now().toString(10)]: newRule()
      }
    };
    console.log(this.state);
  }

  updateRule(id, rule) {
    let newRules = Object.assign({}, this.state.rules);
    newRules[id] = rule;
    this.setState(Object.assign({}, {rules: newRules}));
  }

  addRule() {
    let newRules = Object.assign({}, this.state.rules);
    newRules[Date.now().toString(10)] = newRule();
    this.setState(Object.assign(this.state, {rules: newRules}));
  }

  deleteRule(key) {
    let newRules = Object.assign({}, this.state.rules);
    delete newRules[key];
    this.setState(Object.assign(this.state, {rules: newRules}));
  }

  handleTitleChange(event) {
    let newState = Object.assign(this.state, {title: event.target.value});
    this.setState(newState);
  }

  render() {
    let rules = [];
    for(const [key, value] of Object.entries(this.state.rules)) {
      rules.push(
        <li key={key}>
          <Rule id={key} delete={this.deleteRule.bind(this, key)} content={value} onUpdate={this.updateRule.bind(this)}/>
        </li>
      );
    }
    return (
      <fieldset className="custom-mapping">
        <legend>Custom Complex Mapping</legend>
        <label className="form-label">Title</label>
        <input
          className="form-input"
          value={this.state.title}
          placeholder="Mapping title"
          onChange={this.handleTitleChange.bind(this)}
        /><br/>
        <ul>{rules}</ul>
        <button onClick={this.addRule.bind(this)}>Add Rule</button>
      </fieldset>
    );
  }
}

// ========================================

ReactDOM.render(
  <CustomMapping />,
  document.getElementById('root')
);
