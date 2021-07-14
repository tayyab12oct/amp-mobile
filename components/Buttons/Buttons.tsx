import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';

export function Buttons(props) {
  return (
    <div>
      <Button
        variant="primary"
        className={props.className}
        onClick={props.onClick}
      >
        <div className="buttontext">
          <span>{props.startIcon || null}</span>
          <span>{props.text}</span>
          <span>{props.endIcon || null}</span>
        </div>
      </Button>
    </div>
  );
}

export function DropdownButton(props) {
  return (
    <Dropdown alignRight>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="dropdownButton"
      >
        <div className="dropdowntext">
          <span>{props.startIcon || null}</span>
          <span>{props.text}</span>
          <span>{props.endIcon || null}</span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdownSection">
        {props.children}
      </Dropdown.Menu>
    </Dropdown>
  );
}
