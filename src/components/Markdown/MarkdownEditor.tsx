import { MarkdownEditorProps } from '@/EditorTypes';
import { BlockSchema, defaultBlockSchema } from '@blocknote/core';
import { BlockNoteView, useBlockNote, defaultReactSlashMenuItems } from '@blocknote/react';
import React from 'react';
import { getRandomColor } from '~/utils/awarenessHelpers';
import { Image, insertImage } from './Image';
import styles from './MarkdownCell.module.css';

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ cell, content, provider, currentUser, theme }) => {
  // Temporarily override console.log
  const consoleLog = console.log;
  console.log = () => {};
  const id = cell.get('id');
  // ********************************

  const customSchema = {
    ...defaultBlockSchema,
    image: Image
  } satisfies BlockSchema;

  const editor = useBlockNote({
    theme: theme === 'dark' ? 'dark' : 'light',
    blockSchema: customSchema,
    slashCommands: [...defaultReactSlashMenuItems, insertImage],
    editorDOMAttributes: {
      class: [styles['blocknote-editor'], theme].join(' ')
    },
    collaboration: {
      provider,
      fragment: content,
      user: {
        name: currentUser?.name || 'Anonymous User',
        color: currentUser?.color || getRandomColor()
      }
    },

    onEditorReady: () => {
      const paragraph = document.querySelector(`#blockcell-${id} div div p`);
      if (paragraph?.textContent && paragraph.textContent.trim() === '') {
        paragraph.textContent = '';
      }
    }
  });

  // Restore console.log
  setTimeout(() => (console.log = consoleLog), 0);

  return <BlockNoteView editor={editor} />;
};

export default MarkdownEditor;
