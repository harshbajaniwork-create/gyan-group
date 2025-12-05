import draftToHtml from "draftjs-to-html";

export const convertRichTextToHtml = (rawContent: string): string => {
  try {
    if (!rawContent) return "";

    // Check if content is already HTML (starts with <)
    if (rawContent.trim().startsWith("<")) {
      return rawContent;
    }

    // Parse JSON string to object
    const rawObject = JSON.parse(rawContent);

    // Convert to HTML
    const html = draftToHtml(rawObject);
    return html;
  } catch (error) {
    console.error("Error converting rich text to HTML:", error);
    // Return original content if parsing fails, might be plain text
    return rawContent;
  }
};
