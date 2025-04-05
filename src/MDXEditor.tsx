import React from 'react';
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  CodeToggle,
  toolbarPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  headingsPlugin,
  imagePlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  linkDialogPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';  // Import default styles

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="border rounded">
            <MDXEditor
              markdown={value}
              onChange={onChange}
              plugins={[
                toolbarPlugin({
                  toolbarContents: () => (
                    <div className="d-flex align-items-center gap-2 bg-light border-bottom p-2">
                      <UndoRedo />
                      <div className="vr"></div>
                      <BoldItalicUnderlineToggles />
                      <div className="vr"></div>
                      <ListsToggle />
                      <div className="vr"></div>
                      <BlockTypeSelect />
                      <div className="vr"></div>
                      <CreateLink />
                      <div className="vr"></div>
                      <InsertImage />
                      <div className="vr"></div>
                      <CodeToggle />
                    </div>
                  )
                }),
                listsPlugin(),
                linkPlugin(),
                quotePlugin(),
                headingsPlugin(),
                imagePlugin(),
                markdownShortcutPlugin(),
                codeBlockPlugin(),
                linkDialogPlugin(),
              ]}
              className="markdown-editor"
              contentEditableClassName="editor-content p-3"
              placeholder="Enter your Markdown here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default MarkdownEditor;