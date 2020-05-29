import React from 'react';
import get from 'lodash/get';
import keys from 'lodash/keys';

import EntityView from './EntityView';
import Note from './Note';
import Paragraphs from './Paragraphs';

const NodeEntityMapper = ({ node }) => {
  const soloKey = get(keys(node), '0', 'unknown');
  const nodeType = node.type || soloKey;

  // TODO: Consider a more meaningful component for links
  switch (nodeType) {
    case 'note':
      return <Note>{node.value || node.note}</Note>;
    case 'text':
      return <Paragraphs>{node.value || node.text}</Paragraphs>;
    case 'link':
      return <a href={node.value|| node.link}>{node.value|| node.link}</a>
    default:
      return <EntityView entity={node} />;
  }
};

export default NodeEntityMapper;
