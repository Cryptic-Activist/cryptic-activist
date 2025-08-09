import { CustomElement, CustomText } from '@/components/RichTextEditor/types';

import { Descendant } from 'slate';

export const slateToHtml = (nodes: Descendant[]): string => {
	return nodes
		.map((node) => {
			if ('text' in node) {
				let html = (node as CustomText).text;
				if ((node as CustomText).bold) {
					html = `<strong>${html}</strong>`;
				}
				if ((node as CustomText).italic) {
					html = `<em>${html}</em>`;
				}
				if ((node as CustomText).underline) {
					html = `<u>${html}</u>`;
				}
				if ((node as CustomText).code) {
					html = `<code>${html}</code>`;
				}
				return html;
			} else {
				const element = node as CustomElement;
				const childrenHtml = slateToHtml(element.children);

				switch (element.type) {
					case 'paragraph':
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
