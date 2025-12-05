"use client";

import React from "react";
import { Editor as RichTextEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { convertFromRaw, convertToRaw } from "draft-js";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditorWrapper({
  value,
  onChange,
}: RichTextEditorProps) {
  const [editorState, setEditorState] = React.useState(() => {
    if (!value || value === "") {
      return EditorState.createEmpty();
    }
    try {
      const contentState = convertFromRaw(JSON.parse(value));
      return EditorState.createWithContent(contentState);
    } catch (error) {
      console.warn("Failed to parse editor content:", error);
      return EditorState.createEmpty();
    }
  });

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    onChange(JSON.stringify(raw));
  };

  return (
    <div className="border rounded-md p-4 min-h-[200px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <RichTextEditor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "emoji",
            "image",
            "remove",
            "history",
          ],
        }}
        placeholder="Write your blog content here..."
      />
    </div>
  );
}
