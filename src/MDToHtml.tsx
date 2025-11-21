import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import styles from './styles/MDToHtml.module.css';
import Prism from 'prismjs';
import rehypePrism from 'rehype-prism-plus';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import './styles/prism-shades-of-purple.css';
import { useEffect } from 'react';

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <ReactMarkdown
      className="p-4"
      remarkPlugins={[remarkGfm, [remarkToc, { maxDepth: 3, tight: true }]]}
      rehypePlugins={[[rehypeSlug, rehypePrism]]}
      components={{
        img: (props) => (
          <span className={styles.imageWrapper}>
            <a
              href={props.src}
              target="_blank"
              rel="noreferrer"
            >
              <img
                {...props}
                alt={props.alt ?? ''}
              />
            </a>
          </span>
        ),
        table: ({ children, ...props }) => (
          <div className="table-wrapper">
            <table {...props}>{children}</table>
          </div>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
