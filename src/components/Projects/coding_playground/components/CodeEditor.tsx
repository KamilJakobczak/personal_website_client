import { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import traverse from '@babel/traverse';
import MonacoJSXHighlighter, { makeBabelParse } from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  // const babelParse = (code: any) =>
  //   parse(code, {
  //     sourceType: 'module',
  //     plugins: ['jsx'],
  //   });

  const onEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editorRef.current.getValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });

    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      monaco,
      makeBabelParse,
      // traverse,
      editor
    );

    // monacoJSXHighlighter.highLightOnDidChangeModelContent(100);
    // monacoJSXHighlighter.addJSXCommentCommand();
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formatted);
  };
  return (
    <div className='editor_wrapper'>
      <button className='editor_wrapper__button' onClick={onFormatClick}>
        Format
      </button>
      <Editor
        onMount={onEditorDidMount}
        value={initialValue}
        theme='vs-dark'
        defaultLanguage='javascript'
        height='100%'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};
export default CodeEditor;
