import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import SuccessMessage from "./SuccessMessage";

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.get("http://localhost:3001/long-request-1");

      await axios.get("http://localhost:3001/long-request-2");

      await axios.get("http://localhost:3001/long-request-3");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);

      setIsComplaintSubmitted(true);
    }
  };

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
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {isComplaintSubmitted && (
        <SuccessMessage message="Your Complaint is submitted to our management !!" />
      )}
    </Box>
  );
};

export default MyForm;
