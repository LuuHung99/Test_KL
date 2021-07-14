import React from "react";

import { Skeleton } from "antd";

function LoadingData(props) {
  return (
    <div>
      <Skeleton />
    </div>
  );
}

export default React.memo(LoadingData);
