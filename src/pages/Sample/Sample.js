import React from 'react';
import Logo from '/components/modules/Logo';
import * as s from './Sample.styled';

const Sample = () => (
  <s.Container>
    <Logo />
    <s.Message>오분이면 충분하죠!</s.Message>
  </s.Container>
);

export default Sample;
