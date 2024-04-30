import { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { InputLabel, Switch, TextField } from '@mui/material';
import './index.css';

export default function LinkPopover({ editor, editorSection }) {
  const [selection, setSelection] = useState('');
  const [follow, setFollow] = useState(false);
  const [link, setLink] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [position, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [range, setRange] = useState(null);

  const handleClick = () => {
    const previousUrl = editor.getAttributes('link').href;
    if (previousUrl) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      setRange(editor.state.selection.ranges[0]);
      const selectionRange = window
        .getSelection()
        .getRangeAt(0)
        .getBoundingClientRect();
      setSelection(selectedText);
      setPopoverPosition({ x: selectionRange.left, y: selectionRange.bottom });
      setPopoverVisible(true);
    } else {
      setPopoverVisible(false);
    }
  };

  const handleClose = () => {
    // setAnchorEl(null);
  };

  useEffect(() => {
    if (selection && range && editor) {
      editor
        .chain()
        .deleteRange({ from: range.$from.pos, to: range.$to.pos })
        .run();
      editor.chain().insertContentAt(range.$from, selection).run();
      editor
        .chain()
        .setTextSelection({
          from: range.$from.pos,
          to: range.$from.pos + selection.length,
        })
        .run();

      setRange(editor.state.selection.ranges[0]);
      //   editor.chain().setTextSelection({ from: 5, to: 10 }).run();
    }
  }, [selection]);

  const id = 'simple-popover';

  return (
    <span>
      <button
        onClick={handleClick}
        className={`${editor.isActive('link') ? 'is-active' : ''} toolbar-btn`}
        disabled={editorSection === 'title'}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          class='bi bi-link-45deg'
          viewBox='0 0 16 16'
        >
          <path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z' />
          <path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z' />
        </svg>
      </button>
      <Popover
        id={id}
        open={popoverVisible}
        onClose={handleClose}
        style={{
          position: 'absolute',
          top: position.y + window.scrollY,
          left: position.x + window.scrollX,
          zIndex: 9999, // ensure the popover appears above other elements
        }}
        slotProps={{ paper: { className: 'link-menu-container' } }}
      >
        <div className='container'>
          <TextField
            id='outlined-basic'
            label='Link'
            variant='outlined'
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <TextField
            id='outlined-basic'
            label='Text'
            variant='outlined'
            value={selection}
            onChange={(e) => {
              setSelection(e.target.value);
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <InputLabel>Do Follow ?</InputLabel>
            <Switch
              checked={follow}
              onChange={() => {
                setFollow(!follow);
              }}
            />
          </div>

          <div className='btn-container'>
            <Button
              variant='contained'
              color='error'
              onClick={() => {
                setPopoverVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .setLink({
                    href: link,
                    target: '_blank',
                    rel: follow ? 'follow' : 'nofollow',
                  })
                  .run();
                setPopoverVisible(false);
              }}
            >
              Done
            </Button>
          </div>
        </div>
      </Popover>
    </span>
  );
}
