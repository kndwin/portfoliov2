import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { CSSProperties, Suspense, ReactNode } from "react";
import { styled } from "stitches.config";
import { IconButton, Box, Text, Button, Slider } from "common/ui";

import { FaceModel } from "modules/home/FaceModel";
import { useCanvasStore } from 'modules/home/store'

export const CanvasFaceModel = () => {
  const zoom = useCanvasStore((s) => s.zoom);
  return (
    <StyledCanvas>
      <OrthographicCamera makeDefault position={[0, 0, 15]} zoom={zoom} />

      <ambientLight intensity={0.7} />
      <Suspense fallback={null}>
        <FaceModel />
      </Suspense>
    </StyledCanvas>
  );
};
const StyledCanvas = styled(Canvas, {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  "& > div": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});
