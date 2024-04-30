import { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  Divider,
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Popper,
  Switch,
  TextField,
  ToggleButton,
} from '@mui/material';
import './index.css';
import { CaretDownIcon, ColumnsIcon, DeleteIcon, RowsIcon } from '../Icons';

const actions = [
  {
    label: 'Columns',
    icon: <ColumnsIcon />,
    subMenu: [
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
    ],
  },

  {
    label: 'Rows',
    icon: <RowsIcon />,
    subMenu: [
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
    ],
  },
  {
    label: 'Delete Table',
    icon: <DeleteIcon />,
    action: (editor) => editor.commands.deleteTable(),
  },
];

export default function TablePopover({ editor, editorSection }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [secondaryAnchor, setSecondaryAnchor] = useState(null);

  const getTableElement = () => {
    const { state } = editor;
    const tableNode = state.schema.nodes.table;

    if (!tableNode) return null;

    const $pos = state.selection.$from;

    for (let d = $pos.depth; d >= 0; d--) {
      const node = $pos.node(d);
      if (node && node.type === tableNode) {
        return editor.view.nodeDOM($pos.before(d));
      }
    }

    return null;
  };

  const showPopper = () => {
    if (editor.isActive('table')) {
      const tableElement = getTableElement();
      setAnchorEl(tableElement);
    } else {
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    showPopper();
  }, [editor.state.selection.from]);
  const handleClick = (event) => {
    if (!editor.isActive('table')) {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 6, withHeaderRow: true })
        .run();
      return;
    } else {
      showPopper();
    }
  };

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  return (
    <span>
      <button
        aria-describedby={id}
        onClick={handleClick}
        className={`${editor.isActive('table') ? 'is-active' : ''} toolbar-btn`}
        disabled={editorSection === 'title'}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          class='bi bi-table'
          viewBox='0 0 16 16'
        >
          <path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z' />
        </svg>
      </button>

      <Popper
        id='simple-menu'
        anchorEl={anchorEl}
        placement='right'
        open={open}
        className='menu'
      >
        {actions.map((el) => {
          return el?.subMenu?.length ? (
            <>
              <MenuItem
                onClick={() => {
                  secondaryAnchor === el.label
                    ? setSecondaryAnchor(null)
                    : setSecondaryAnchor(el.label);
                }}
              >
                {el.icon && <ListItemIcon>{el.icon}</ListItemIcon>}
                {el.label}
                <ListItemIcon
                  className={`${
                    el.label === secondaryAnchor ? 'expanded' : 'not-expanded'
                  } expand-icon`}
                >
                  <CaretDownIcon />
                </ListItemIcon>
              </MenuItem>

              {secondaryAnchor === el.label && (
                <div className='sub-menu'>
                  {el.subMenu.map((item, i) => (
                    <MenuItem
                      key={i}
                      onClick={() => {
                        item.action(editor);
                      }}
                    >
                      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                      {item.label}
                    </MenuItem>
                  ))}
                </div>
              )}
            </>
          ) : (
            <MenuItem
              onClick={() => {
                el.action(editor);
              }}
            >
              {el.icon && <ListItemIcon>{el.icon}</ListItemIcon>}
              {el.label}
            </MenuItem>
          );
        })}
        <Divider />
      </Popper>
    </span>
  );
}
