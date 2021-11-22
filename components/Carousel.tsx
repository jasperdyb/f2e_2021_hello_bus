import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import banner01 from "public/img//banner01.jpg";
import Image from "next/image";
import styled from "styled-components";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import ImageWithFallback from "components/ImageWithFallback";
import SceneInfoSlideCard from "components/SceneInfoSlideCard";

import { SceneSpotDataType } from "types/sceneSpots";
import { Typography } from "@mui/material";

const Embla = styled("div")`
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

const EmblaViewPort = styled("div")`
  overflow: hidden;
  width: 100%;
`;

const EmblaCoverContainer = styled("div")`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

const EmblaCover = styled("div")`
  position: absolute;
  top: -200%;
  left: -5%;
  width: 110%;
  height: 500%;
  pointer-events: none;

  -webkit-box-shadow: inset 0px 0px 50px 120px #ffffff;
  box-shadow: inset 0px 0px 50px 120px #ffffff;
`;

const EmblaContainer = styled("div")`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  margin-left: -50px;
`;

const EmblaSlide = styled("div")`
  position: relative;
  min-width: 40%;
  padding-left: 50px;
`;

const EmblaSlideInner = styled("div")`
  position: relative;
  overflow: hidden;
  height: 212px;
  width: 444px;
  margin: 0 auto;
`;

const EmblaUnselectedSlideInner = styled(EmblaSlideInner)`
  transform: scale(0.8, 0.8);
`;

const NavButton = styled(IconButton)`
  position: absolute;
  height: 100%;
  top: 0;
  cursor: pointer;
`;

const NextButton = styled(NavButton)`
  right: 300px;
`;

const BeforeButton = styled(NavButton)`
  left: 300px;
`;

interface Props {
  slideData: Array<SceneSpotDataType>;
}

const Carousel: React.FC<Props> = ({ slideData }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  const renderSlide = (item: SceneSpotDataType, index: number) => {
    const Inner =
      index === selectedIndex ? EmblaSlideInner : EmblaUnselectedSlideInner;

    return (
      <EmblaSlide key={index}>
        <Inner>
          <SceneInfoSlideCard sceneSpotData={item} />
        </Inner>
      </EmblaSlide>
    );
  };
  return (
    <>
      <Embla>
        <EmblaViewPort ref={viewportRef}>
          <EmblaContainer>
            {slideData &&
              slideData.map((item, index) => renderSlide(item, index))}
          </EmblaContainer>
        </EmblaViewPort>

        <EmblaCoverContainer>
          <EmblaCover />
        </EmblaCoverContainer>
        <BeforeButton
          onClick={scrollPrev}
          color="secondary"
          aria-label="prev"
          size="large"
          disableRipple
        >
          <NavigateBeforeIcon fontSize="inherit" />
        </BeforeButton>
        <NextButton
          onClick={scrollNext}
          color="secondary"
          aria-label="next"
          size="large"
          disableRipple
        >
          <NavigateNextIcon fontSize="inherit" />
        </NextButton>
      </Embla>
    </>
  );
};

export default Carousel;
