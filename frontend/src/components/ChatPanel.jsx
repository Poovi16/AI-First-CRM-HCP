import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";

import { useDispatch } from "react-redux";
import { updateInteraction } from "../redux/interactionSlice";
import { sendChat } from "../services/chatService";

export default function ChatPanel() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState([
    {
      sender: "AI",
      text: "Hello 👋 Tell me about your meeting with the doctor.",
    },
  ]);

  const handleSend = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    const userMessage = message;

    // User message
    setChatHistory((prev) => [
      ...prev,
      {
        sender: "You",
        text: userMessage,
      },
    ]);

    setLoading(true);

    try {
      const responseData = await sendChat(userMessage);

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      dispatch(updateInteraction(responseData.data));

      setChatHistory((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "✅ Interaction extracted and saved successfully.",
        },
      ]);

      setMessage("");

    } catch (error) {
      console.error(error);

      setChatHistory((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "❌ Failed to connect to backend.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        height: "500px",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <SmartToyIcon color="primary" />
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
          >
            AI Assistant
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Log interaction details here via chat
        </Typography>
      </Box>

      <Divider />

      {/* Chat */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          bgcolor: "#fafafa",
        }}
      >
        {chatHistory.map((chat, index) => (
          <Box
            key={index}
            mb={2}
          >
            <Typography
              fontWeight="bold"
              color={chat.sender === "AI" ? "primary" : "success.main"}
            >
              {chat.sender}
            </Typography>

            <Box
              sx={{
                mt: 0.5,
                p: 1.5,
                bgcolor:
                  chat.sender === "AI"
                    ? "#E3F2FD"
                    : "#F5F5F5",
                borderRadius: 2,
              }}
            >
              <Typography whiteSpace="pre-line">
                {chat.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Divider />

      {/* Input */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
        }}
      >
        <TextField
          multiline
          rows={2}
          fullWidth
          placeholder="Describe today's interaction..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            py: 1.2,
            borderRadius: 2,
            fontWeight: "bold",
          }}
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size={22}
              color="inherit"
            />
          ) : (
            "SEND"
          )}
        </Button>
      </Box>
    </Paper>
  );
}