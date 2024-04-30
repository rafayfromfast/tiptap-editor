import './Tiptap.scss';

import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import {
  Editor,
  EditorContent,
  EditorContext,
  EditorProvider,
  useCurrentEditor,
} from '@tiptap/react';
import Underline from '@tiptap/extension-underline';

import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Toolbar from './Toolbar';
import BottomBar from './BottomBar';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import MainEditor from './MainEditor';
import Heading from '@tiptap/extension-heading';
import HardBreak from '@tiptap/extension-hard-break';
import Document from '@tiptap/extension-document';

export const LIMIT = 2000;

export const extensions = {
  title: [
    Underline,
    Heading.configure({
      levels: [1],
    }),
    // TextStyle.configure({ types: [ListItem.name] }),

    Placeholder.configure({
      placeholder: ({ node }) => {
        console.log('node :', node);
        const headingPlaceholders = {
          1: 'Enter a title...',
        };
        if (node.type.name === 'heading') {
          // @ts-ignore
          console.log(
            'headingPlaceholders[node.attrs.level] :',
            headingPlaceholders[node.attrs.level]
          );
          return headingPlaceholders[node.attrs.level];
        }
        return '';
      },
    }),
    // Heading.configure({
    //   levels: [1],
    // }),
    // Underline,
    // Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      schema: {
        // Define the top-level nodes (block elements)
        topNode: 'heading', // Change 'heading' to the desired node type
        // Define allowed nodes
        allow: {
          heading: true, // Allow only the desired node type
        },
        // Define disallowed nodes
        forbid: ['paragraph', 'bullet_list', 'ordered_list'], // Disallow other node types if needed
      },
    }),
    // Placeholder.configure({
    //   placeholder: 'Title ...',
    // }),
    // Placeholder.configure({
    //   placeholder: ({ node }) => {
    //     console.log('node placeholders:', node);
    //     const headingPlaceholders = {
    //       1: 'Enter a title...',
    //     };
    //     if (node.type.name === 'heading') {
    //       // @ts-ignore
    //       return headingPlaceholders[node.attrs.level];
    //     }
    //     return '';
    //   },
    // }),
    // HardBreak.extend({
    //   addKeyboardShortcuts() {
    //     return {
    //       Enter: () => true,
    //     };
    //   },
    // }),
  ],
  introduction: [
    Underline,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      defaultAlignment: 'left',
    }),

    Link.configure({
      openOnClick: true,
      autolink: true,
    }),
    Table.configure({
      resizable: true,
      allowTableNodeSelection: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    CharacterCount.configure({
      limit: LIMIT,
    }),
  ],
  content: [
    Underline,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      defaultAlignment: 'left',
    }),

    Link.configure({
      openOnClick: true,
      autolink: true,
    }),
    Table.configure({
      resizable: true,
      allowTableNodeSelection: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    CharacterCount.configure({
      limit: LIMIT,
    }),
  ],
};

const content = {
  title: `<h1>Test title</h1>`,
  introduction: `Intro text`,
  content: `
<h2 class="title">
  Hi there,
</h2>
<node-view contenteditable="false">Hi there bro </node-view>
<div class="content" data-type="div">
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<h3>
heading 1.1
</h3>
<div> Div content </div>
<h3>
heading 1.2
</h3>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
</div>
<div class="introduction">
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
</div>
`,
};

export default () => {
  return (
    <div className='tiptap-container'>
      {/* <EditorProvider
        slotBefore={<Toolbar />}
        slotAfter={<BottomBar limit={LIMIT} />}
      > */}

      <MainEditor content={content} extensions={extensions} />
      {/* </EditorProvider> */}
    </div>
  );
};
