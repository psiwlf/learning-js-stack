import { storiesOf } from '@storybook/react';
import { Button } from './Button';

// storiesOf('Button', module).addWithJSX('with background', () => (
//     <Button bg='plaegoldenrod'>{'Hellow Worldie'}</Button>
// )).addWithJSX('with background2', () => (
//     <Button bg='green'>Hellow Worldie 2</Button>
// ))
storiesOf('Button', module).add('with background', () => (
    <Button />
)).add('with background2', () => (
    <Button />
))