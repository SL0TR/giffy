import React from 'react';
import { LayoutContent, LayoutContentWrapper } from 'styles';
import { SingleGifView } from 'features/Gifs';

function GifDetailPage() {
  return (
    <LayoutContentWrapper>
      <LayoutContent className="shadow">
        <SingleGifView />
      </LayoutContent>
    </LayoutContentWrapper>
  );
}

export default GifDetailPage;
