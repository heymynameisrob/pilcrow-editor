
import { Editor } from "@tiptap/core";
import he from "he";

export function getAllText(editor: Editor) {
  return editor.state.doc.textBetween(0, editor.state.doc.content.size, "\n");
}

export function getPreviousText(
  editor: Editor,
  options: { chars: number; offset?: number },
) {
  const offset = options.offset || 0;
  return editor.state.doc.textBetween(
    Math.max(0, editor.state.selection.from - options.chars),
    editor.state.selection.from - offset,
    "\n",
  );
}

export function getSelectedText(editor: Editor) {
  return editor.state.doc.textBetween(
    editor.state.selection.from,
    editor.state.selection.to,
  );
}

export function isSelectionEmpty(editor: Editor) {
  const { view } = editor;
  const { selection } = view.state;
  return selection.empty;
}

export function isNodeEmpty(node: any) {
  return node && node.isText && node.text === "";
}

export function stripTitleFromContent(content: string) {
  const match = /<h[1][^>]*>(.*?)<\/h[1]>/.exec(content);

  if (!content) return;

  // remove all html tags from match
  if (match && match[1]) {
    return he.decode(match[1].replace(/(<([^>]+)>)/gi, ""));
  } else {
    return null; // Or any default value you prefer
  }
}

export function getTitleFromJson(json: any) {
  if (!json || !json.content[0] || !json.content[0].content) return "Untitled";
  return json.content[0].content[0].text || "Untitled";
}

export function getEmbedUrl(url: string | null) {
  if (!url) return null;

  if (url.includes("youtube.com")) {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("figma.com")) {
    const fileId = url.split("file/")[1];
    return `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileId}`;
  }

  if (url.includes("loom.com")) {
    const videoId = url.split("share/")[1];
    return `https://www.loom.com/embed/${videoId}`;
  }

  return url;
}

export function stripFirstTag(content: string) {
  // Remove first h1 tag from string
  const match = /<h1[^>]*>(.*?)<\/h1>/.exec(content);
  if (match && match[0]) {
    return content.replace(match[0], "");
  } else {
    return content;
  }
}

export function extractTextFromJSON(json: any) {
  let textString = "";

  function extractText(contentArray: any) {
    for (const content of contentArray) {
      if (content.type === "text") {
        textString += content.text;
      } else if (content.content) {
        extractText(content.content);
      }
    }
  }

  if (json && json.content) {
    extractText(json.content);
  }

  return textString;
}
