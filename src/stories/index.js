import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ExplodingDots from '../index';

storiesOf('ExplodingDots', module)
  .add('default view', () => (
    <ExplodingDots onClick={ action('button clicked') }>Hello</ExplodingDots>
  ))
  .add('some emojies as the text', () => (
    <ExplodingDots>😀 😎 👍 💯</ExplodingDots>
  ))
  .add('custom styles', () => {
    const style = {
      fontSize: 20,
      textTransform: 'uppercase',
      color: '#FF8833',
    };
    return (
      <ExplodingDots style={ style }>Hello</ExplodingDots>
    );
  });
