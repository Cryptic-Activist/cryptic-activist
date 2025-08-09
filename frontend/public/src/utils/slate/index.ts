export const slateToHtml = (nodes: any[]): string => {
  console.log({ nodes });
  return nodes
    .map((node) => {
      if ('text' in node) {
        let html = node.text;
        // Do NOT replace newline characters with <br> tags here.
        // Line breaks are handled by the paragraph structure in this schema.

        if (node.bold) {
          html = `<strong>${html}</strong>`;
        }
        if (node.italic) {
          html = `<em>${html}</em>`;
        }
        if (node.underline) {
          html = `<u>${html}</u>`;
        }
        if (node.code) {
          html = `<code>${html}</code>`;
        }
        return html;
      } else {
        const element = node;
        const childrenHtml = slateToHtml(element.children);

        switch (element.type) {
          case 'paragraph':
            // Render each paragraph as a <p> tag. Empty paragraphs will naturally create line breaks.
            return `<p>${childrenHtml}</p>`;
          case 'h1':
            return `<h1>${childrenHtml}</h1>`;
          case 'h2':
            return `<h2>${childrenHtml}</h2>`;
          case 'blockquote':
            return `<blockquote>${childrenHtml}</blockquote>`;
          case 'bulleted-list':
            return `<ul>${childrenHtml}</ul>`;
          case 'numbered-list':
            return `<ol>${childrenHtml}</ol>`;
          case 'list-item':
            return `<li>${childrenHtml}</li>`;
          case 'link':
            return `<a href="${element.url}">${childrenHtml}</a>`;
          case 'image':
            return `<img src="${element.src}" alt="${element.alt || ''}" />`;
          case 'code-block':
            return `<pre><code>${childrenHtml}</code></pre>`;
          default:
            return childrenHtml;
        }
      }
    })
    .join('');
};
