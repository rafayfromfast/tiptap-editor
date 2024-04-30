import React, { useEffect, useMemo, useState } from 'react';
import {
  NodeViewWrapper,
  NodeViewContent,
  EditorContent,
  useCurrentEditor,
  Editor,
  useEditor,
  EditorContext,
} from '@tiptap/react';
import Toolbar from './Toolbar';

import './MainEditor.scss';

const MainEditor = ({ content, extensions }) => {
  const [currentNode, setCurrentNode] = useState();
  const [editorSection, setEditorSection] = useState(null);
  const titleEditor = useEditor({
    extensions: extensions.title,
    content: content.title,
  });

  const introEditor = useEditor({
    extensions: extensions.introduction,
    content: content.introduction,
  });
  const contentEditor = useEditor({
    extensions: extensions.content,
    content: content.content,
  });
  const [activeEditor, setEditor] = useState(null);

  useEffect(() => {
    if (titleEditor?.isFocused) {
      setEditor(titleEditor);
      setEditorSection('title');
    } else if (introEditor?.isFocused) {
      setEditor(introEditor);
      setEditorSection('intro');
    } else if (contentEditor?.isFocused) {
      setEditor(contentEditor);
      setEditorSection('content');
    }
  }, [
    titleEditor?.isFocused,
    contentEditor?.isFocused,
    introEditor?.isFocused,
  ]);
  // const activeEditor = useMemo(
  //   () =>
  //     titleEditor?.isFocused
  //       ? titleEditor
  //       : introEditor?.isFocused
  //       ? introEditor
  //       : contentEditor
  //       ? contentEditor?.isFocused
  //       : activeEditor,
  //   [titleEditor?.isFocused]
  // );
  if (!contentEditor || !introEditor || !titleEditor) {
    return null;
  }
  const processHeadingNodes = (headingNodes) => {
    let currentLevel = 10;
    let currentIndex = [0, 0];
    headingNodes.forEach((el) => {
      let str = '';

      if (el.level < currentLevel) {
        currentLevel = el.level;

        currentIndex = [...currentIndex.splice(0, currentIndex.length - 1)];

        currentIndex = [
          ...currentIndex.splice(0, currentIndex.length - 1),
          currentIndex[currentIndex.length - 1] + 1,
        ];
      } else if (el.level > currentLevel) {
        currentLevel = el.level;

        currentIndex = [...currentIndex, 1];
      } else {
        currentIndex = [
          ...currentIndex.slice(0, -1),
          currentIndex[currentIndex.length - 1] + 1,
        ];
      }

      str = currentIndex.join('.');
      el.title = str;
    });
    return headingNodes;
  };

  const handleTransaction = (val) => {
    console.log('val :', val);
    const nodesList = contentEditor?.state?.doc?.content?.content;

    const nodes = nodesList?.map((el) => ({
      nodeType: el.type.name,
      content: el?.content?.content[0]?.text,
      level: el?.attrs?.level,
      node: el,
    }));

    console.log('nodes :', nodes);

    console.log(
      'nodes :',
      nodes.filter((el) => el?.nodeType === 'heading')
    );

    const { selection } = val.editor.state;
    console.log('selection obj :', selection);
    console.log('selection :', selection.$head.parent);

    let index = nodes.findIndex((el) => el.node === selection.$head.parent);
    if (index < 0) {
      selection.$anchor.path.forEach((elx) => {
        const newIndex = nodes.findIndex((el) => el.node === elx);
        if (newIndex >= 0) {
          index = newIndex;
        }
      });
    }
    if (nodes[index].nodeType !== 'heading') {
      for (let i = index; i >= 0; i--) {
        if (nodes[i].nodeType === 'heading') {
          index = i;
          break;
        }
      }
    }
    console.log(nodes[index]);

    const headingNodes = nodes.filter((el) => el.nodeType === 'heading');
    console.log('headingNodes :', headingNodes);
    const processedHeadings = processHeadingNodes(headingNodes);
    console.log('processedHeadings :', processedHeadings);

    const currentNode = processedHeadings.find(
      (el) => el.node === nodes[index].node
    );
    setCurrentNode(currentNode);
  };

  contentEditor.on('selectionUpdate', handleTransaction);

  return (
    <div className='mainEditor'>
      <Toolbar editor={activeEditor} editorSection={editorSection} />
      <div className='titleSection'>
        <EditorContent editor={titleEditor} />
      </div>
      <div className='introSection'>
        <div className='sectionTitle'>Introduction</div>

        <EditorContent editor={introEditor} />
      </div>
      <div className='contentSection'>
        <div className='sectionTitle'>Content</div>
        <EditorContent editor={contentEditor} />
      </div>
      <div className='current-node'>{currentNode?.title || 1}</div>
    </div>
  );
};

export default MainEditor;
