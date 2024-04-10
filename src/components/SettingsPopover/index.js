import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  Divider,
  InputLabel,
  Menu,
  MenuItem,
  Switch,
  TextField,
  ToggleButton,
} from '@mui/material';
import './index.css';
import { SettingsIcons } from '../Icons';

const actions = [
  {
    label: 'Add Column Before',
    action: (editor) => editor.commands.addColumnBefore(),
  },
  {
    label: 'Add Column After',
    action: (editor) => editor.commands.addColumnAfter(),
  },
  {
    label: 'Delete Column',
    action: (editor) => editor.commands.deleteColumn(),
  },
  {
    label: 'Add Row Before',
    action: (editor) => editor.commands.addRowBefore(),
  },
  {
    label: 'Add Row After',
    action: (editor) => editor.commands.addRowAfter(),
  },
  {
    label: 'Delete Row',
    action: (editor) => editor.commands.deleteRow(),
  },
  {
    label: 'Delete Table',
    action: (editor) => editor.commands.deleteTable(),
  },
];

export default function TablePopover({ editor }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mandatoryField, setMandatoryField] = useState(null);
  const [optionalField, setOptionalField] = useState(null);
  const btnRef = useRef();

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    mandatoryField && setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    !mandatoryField && btnRef.current?.click();
  }, []);
  return (
    <span className='container'>
      <button
        ref={btnRef}
        aria-describedby={id}
        onClick={handleClick}
        className={`settings-btn`}
      >
        <SettingsIcons />
        Settings
      </button>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom' }}
        open={open}
        slotProps={{
          paper: {
            className: 'popover-custom',
          },
        }}
      >
        <div className='popover-content'>
          <TextField
            id='outlined-basic'
            label='Mandatory'
            variant='outlined'
            value={mandatoryField}
            required
            onChange={(e) => {
              setMandatoryField(e.target.value);
            }}
          />
          <TextField
            id='outlined-basic'
            label='Optional'
            variant='outlined'
            value={optionalField}
            onChange={(e) => {
              setOptionalField(e.target.value);
            }}
          />
          <Button onClick={handleClose}>Close Settings</Button>
        </div>
      </Popover>
    </span>
  );
}
