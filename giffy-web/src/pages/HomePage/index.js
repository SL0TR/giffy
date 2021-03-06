import React from 'react';
import Gifs from 'features/Gifs';
import { LayoutContentWrapper, LayoutContent } from 'styles';

function DashboardHomePage() {
  return (
    <LayoutContentWrapper>
      <LayoutContent className="shadow">
        <Gifs isPublic />
      </LayoutContent>
    </LayoutContentWrapper>
  );
}

export default DashboardHomePage;
