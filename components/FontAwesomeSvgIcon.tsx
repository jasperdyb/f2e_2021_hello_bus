import type { NextPage } from "next";
import React, { useState, useEffect, useRef } from "react";

import SvgIcon from "@mui/material/SvgIcon";

type FontAwesomeSvgIconProps = {
  icon: any;
};
const FontAwesomeSvgIcon: React.forwardRef<
  SVGSVGElement,
  FontAwesomeSvgIconProps
> = (props, ref) => {
  const { icon } = props;

  const {
    icon: [width, height, , , svgPathData],
  } = icon;

  return (
    <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
      {typeof svgPathData === "string" ? (
        <path d={svgPathData} />
      ) : (
        svgPathData.map((d: string, i: number) => (
          <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </SvgIcon>
  );
};

export default FontAwesomeSvgIcon;
