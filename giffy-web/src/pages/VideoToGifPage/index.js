import React from 'react';
import { LayoutContentWrapper, LayoutContent } from 'styles';
import VideoToGif from 'features/VideoToGif';

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
