import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

type IProgressBar = {
  loading: boolean;
  message: string;
  apiRequestsCount: number;
  apiRequestsDone: number;
};

const Wrapper = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: #ffffff94;
  z-index: 999999;
`;

const InteractiveProgressBarOverlay = ({
  loading,
  message,
  apiRequestsDone,
  apiRequestsCount,
}: IProgressBar) => {
  const progress = (apiRequestsDone / apiRequestsCount) * 100;

  return (
    <Wrapper show={loading}>
      <Box
        sx={{
          width: "30%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
        }}
      >
        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="h6" align="center" marginTop="10px">
          {message}
        </Typography>
      </Box>
    </Wrapper>
  );
};
export default InteractiveProgressBarOverlay;
