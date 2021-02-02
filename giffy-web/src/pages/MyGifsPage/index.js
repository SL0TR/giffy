import Gifs from 'features/Gifs';
import React from 'react';
import { LayoutContentWrapper, LayoutContent } from 'styles';

function index() {
  return (
    <LayoutContentWrapper>
      <LayoutContent className="shadow">
        <Gifs isPublic={false} />
      </LayoutContent>
    </LayoutContentWrapper>
  );
}

export default index;
