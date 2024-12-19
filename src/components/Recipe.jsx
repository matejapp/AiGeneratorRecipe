import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Recipe = ({ generatedRecipe }) => {
  return (
    <section>
      <h2>Chef Claude Recommends:</h2>
      <article className="suggested-recipe-container" aria-live="polite">
        <ReactMarkdown className="markdown-content" remarkPlugins={[remarkGfm]}>
          {generatedRecipe}
        </ReactMarkdown>
      </article>
    </section>
  );
};

export default Recipe;
