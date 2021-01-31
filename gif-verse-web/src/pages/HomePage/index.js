import React from 'react';
import VideoToGif from 'features/VideoToGif';
import { LayoutContentWrapper, LayoutContent } from 'styles';

function DashboardHomePage() {
  return (
    <LayoutContentWrapper>
      <LayoutContent className="shadow">
        <VideoToGif />
      </LayoutContent>
    </LayoutContentWrapper>
  );
}

export default DashboardHomePage;
