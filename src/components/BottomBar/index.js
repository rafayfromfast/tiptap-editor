import { useCurrentEditor } from '@tiptap/react';
import './index.css';

export default function BottomBar({ limit }) {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
  return (
    <div className='bottom-bar'>
      {editor?.storage?.characterCount?.characters() || 0} / {limit} characters
    </div>
  );
}
