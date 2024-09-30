import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import styles from "./styles/MDToHtml.module.css";
import Prism from 'prismjs';
import rehypePrism from 'rehype-prism-plus';
import 'prismjs/themes/prism-tomorrow.css'; // or any other theme you like
import 'prismjs/components/prism-jsx'; // For JSX
import 'prismjs/components/prism-typescript'; // For TypeScript
import 'prismjs/components/prism-tsx'; // For TSX
import './styles/prism-shades-of-purple.css'
import { useEffect } from 'react';


interface MarkdownProps {
  children: string,
}


export default function Markdown({ children }: MarkdownProps) {
  useEffect(() => {
    Prism.highlightAll(); // Trigger Prism to highlight code
  }, [children]);

  return (
    <ReactMarkdown
      className=""
      remarkPlugins={[remarkGfm, [remarkToc, { maxDepth: 3, tight: true }]]}
      rehypePlugins={[[rehypeSlug, rehypePrism]]}
      components={{
        img: (props) => (
          <span className={styles.imageWrapper}>
            <a href={props.src} target='_blank' rel='noreferrer'>
              <img {...props} alt={props.alt ?? ""} />
            </a>
          </span>
        ),
      }}>
      {children}
    </ReactMarkdown>
  )
}
