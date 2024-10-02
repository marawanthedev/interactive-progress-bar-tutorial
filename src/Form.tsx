import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import SuccessMessage from "./SuccessMessage";
import InteractiveProgressBarOverlay from "./InteractiveProgressBar";
import { countAwaits } from "./countAwaits";
// how many api request to be made for X form submission
// how many api requests have been done for X form submission
// current step submission loading message
// incremental progress bar , addition, we include the messsage below it

const MyForm: React.FC = () => {
  const [name, setName] = useState("");
  const [complaint, setComplaint] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isComplaintSubmitted, setIsComplaintSubmitted] = useState(false);
  const [apiRequestsCount, setApiRequestsCount] = useState(0);
  const [apiRequestsDone, setApiRequestsDone] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Loading....");

  const incrementStepsDone = (message?: string) => {
    if (apiRequestsDone < apiRequestsCount) {
      setApiRequestsDone((prev) => prev + 1);
      setLoadingMessage(message || "");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      setLoadingMessage("retriving user details");
      await axios.get("http://localhost:3001/long-request-1");

      incrementStepsDone("intiating complaint submission");
      await axios.get("http://localhost:3001/long-request-2");

      incrementStepsDone("finalizing complaint submission");
      await axios.get("http://localhost:3001/long-request-3");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);

      setIsComplaintSubmitted(true);
    }
  };

  useEffect(() => {
    setApiRequestsCount(countAwaits(handleSubmit));
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      {!loading && !isComplaintSubmitted && (
        <>
          <Typography variant="h6">Complaint Form</Typography>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Complaint"
            variant="outlined"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit complaint
          </Button>
        </>
      )}

      {loading && (
        <InteractiveProgressBarOverlay
          apiRequestsCount={apiRequestsCount}
          apiRequestsDone={apiRequestsDone}
          loading={loading}
          message={loadingMessage}
        />
      )}

      {isComplaintSubmitted && (
        <SuccessMessage message="Your Complaint is submitted to our management !!" />
      )}
    </Box>
  );
};

export default MyForm;
