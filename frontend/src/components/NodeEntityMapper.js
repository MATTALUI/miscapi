import React from 'react';
import get from 'lodash/get';
import keys from 'lodash/keys';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import SyntaxHighlighter from 'react-syntax-highlighter';
import EntityView from './EntityView';
import Note from './Note';
import Paragraphs from './Paragraphs';
import SectionEntity from './SectionEntity';

const NodeEntityMapper = ({ node }) => {
  const soloKey = get(keys(node), '0', 'unknown');
  const nodeType = node.type || soloKey;

  switch (nodeType) {
    case 'note':
      return <Note>{node.value || node.note}</Note>;
    case 'text':
      return <Paragraphs>{node.value || node.text}</Paragraphs>;
    case 'link':
      // TODO: Consider a more meaningful component for links
      return <a href={node.value|| node.link}>{node.value|| node.link}</a>;
    case 'section':
      return <SectionEntity section={node}/>;
    case 'pre':
      return (
        <SyntaxHighlighter language={node.language} style={docco}>
          {node.value || node.pre}
        </SyntaxHighlighter>
      )
    default:
      return <EntityView entity={node} />;
  }
};

export default NodeEntityMapper;
