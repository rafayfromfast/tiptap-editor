import { useCurrentEditor } from '@tiptap/react';
import TablePopover from '../TablePopover';
import LinkPopover from '../LinkPopover';
import TypographySelect from './TypographySelect';
import './Toolbar.css';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BlockquoteIcon,
  BoldIcon,
  BulletListIcon,
  ItalicIcon,
  OrderedListIcon,
  RedoIcon,
  StrikeThroughIcon,
  UnderlineIcon,
  UndoIcon,
  UnsetMarksIcon,
} from '../Icons';
import SettingsPopover from '../SettingsPopover';

const Toolbar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className='menu-container'>
      <div className='inner-container'>
        <>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`${
              editor.isActive('bold') ? 'is-active' : ''
            } toolbar-btn`}
          >
            <BoldIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`${
              editor.isActive('italic') ? 'is-active' : ''
            } toolbar-btn`}
          >
            <ItalicIcon />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`${
              editor.isActive('strike') ? 'is-active' : ''
            } toolbar-btn`}
          >
            <StrikeThroughIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={`${
              editor.isActive('underline') ? 'is-active' : 'no-active'
            } toolbar-btn`}
          >
            <UnderlineIcon />
          </button>
        </>

        <>
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`${
              editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''
            } toolbar-btn`}
          >
            <AlignLeftIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`${
              editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
            } toolbar-btn`}
          >
            <AlignCenterIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`${
              editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''
            } toolbar-btn`}
          >
            <AlignRightIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`${
              editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''
            } toolbar-btn`}
          >
            <AlignJustifyIcon />
          </button>
        </>
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className='toolbar-btn'
        >
          <UnsetMarksIcon />
        </button>
        <TablePopover editor={editor} />

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive('bulletList') ? 'is-active' : ''
          } toolbar-btn`}
        >
          <BulletListIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${
            editor.isActive('orderedList') ? 'is-active' : ''
          } toolbar-btn`}
        >
          <OrderedListIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${
            editor.isActive('blockquote') ? 'is-active' : ''
          } toolbar-btn`}
        >
          <BlockquoteIcon />
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className='toolbar-btn'
        >
          <UndoIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className='toolbar-btn'
        >
          <RedoIcon />
        </button>
        <LinkPopover editor={editor} />
        <TypographySelect editor={editor} />
        <SettingsPopover />
      </div>
    </div>
  );
};

export default Toolbar;
