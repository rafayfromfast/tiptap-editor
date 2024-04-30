import { ListItemIcon, MenuItem, Select } from '@mui/material';
import { useMemo } from 'react';
import {
  Heading1Icon,
  ParagraphIcon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
} from '../Icons';

const headingAction = (editor, val) =>
  editor.chain().focus().toggleHeading({ level: val }).run();

const options = [
  {
    action: (editor) => editor.chain().focus().setParagraph().run(),
    label: 'Paragraph',
    icon: <ParagraphIcon />,
    val: 'para',
  },
  {
    action: (editor) => headingAction(editor, 1),
    label: 'Heading 1',
    icon: <Heading1Icon />,
    val: '1',
  },
  {
    action: (editor) => headingAction(editor, 2),
    label: 'Heading 2',
    icon: <Heading2Icon />,
    val: '2',
  },
  {
    action: (editor) => headingAction(editor, 3),
    label: 'Heading 3',
    icon: <Heading3Icon />,
    val: '3',
  },
  {
    action: (editor) => headingAction(editor, 4),
    label: 'Heading 4',
    icon: <Heading4Icon />,
    val: '4',
  },
  {
    action: (editor) => headingAction(editor, 5),
    label: 'Heading 5',
    icon: <Heading5Icon />,
    val: '5',
  },
  {
    action: (editor) => headingAction(editor, 6),
    label: 'Heading 6',
    icon: <Heading6Icon />,
    val: '6',
  },
];

const TypographySelect = ({ editor, editorSection }) => {
  const handleChange = (e) => {
    const heading = options.find((el) => el.val === e.target.value);
    heading.action(editor);
  };
  const val = useMemo(() => {
    if (editor.isActive('paragraph')) {
      return 'para';
    } else {
      const heading = options.find((el) =>
        editor.isActive('heading', { level: +el.val })
      );
      if (heading) {
        return heading.val;
      }
    }
  }, [handleChange]);
  return (
    <Select
      labelId='demo-simple-select-label'
      id='demo-simple-select'
      label='Turn into'
      value={val}
      onChange={handleChange}
      style={{
        marginLeft: '10px',
        height: '30px',
      }}
    >
      {(editorSection === 'title'
        ? [options[1]]
        : [options[0], ...options.slice(2, options.length)]
      ).map((el) => (
        <MenuItem value={el.val}>
          {el.icon && <ListItemIcon>{el.icon}</ListItemIcon>}
          {el.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TypographySelect;
