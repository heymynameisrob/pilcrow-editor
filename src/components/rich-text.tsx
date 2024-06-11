"use client";
import React, { useEffect, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { useEditor, EditorContent } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import { cn } from "@/utils";

export const RichText = ({
  content,
  className,
  extensions,
}: {
  content: any;
  className?: string;
  extensions?: any[];
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const editor = useEditor({
    extensions: extensions
      ? extensions
      : [
          StarterKit,
          Markdown.configure({ linkify: true }),
          Link.configure({
            autolink: true,
            validate: (href) => /^https?:\/\//.test(href),
          }),
        ],
    editable: false,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm dark:prose-invert",
          "focus:outline-none",
          "prose-code:before:hidden prose-code:after:hidden",
          "prose-h1:text-base prose-h2:text-base prose-h3:text-base prose-h4:text-base prose-h5:text-base prose-h6:text-base",
          "prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-semibold prose-h4:font-semibold prose-h5:font-semibold prose-h6:font-semibold",
          className,
        ),
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor?.commands.setContent(content);
      setLoading(false);
    }
  }, [content, editor]);

  if (loading) return null;

  return <EditorContent editor={editor} contentEditable={false} />;
};
