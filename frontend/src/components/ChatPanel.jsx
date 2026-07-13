import { useState, useRef, useEffect } from "react";

import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Chip,
  Multiline,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import { useDispatch, useSelector } from "react-redux";

import { updateInteraction } from "../redux/interactionSlice";
import { sendChat } from "../services/chatService";

export default function ChatPanel() {
  const dispatch = useDispatch();

  const interaction = useSelector((state) => state.interaction);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi 👋 I am your AI Assistant. Tell me the interaction details.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Ref used to auto-scroll to the latest message
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
    };

    // Add user message once
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await sendChat(input.trim(), interaction.id);

      console.log("Backend Response:", response);

      /*
        Expected backend:

        {
          reply:"message",
          interaction:{
             doctor:"",
             date:"",
             ...
          }
        }

      */

      if (response?.data) {
        console.log("AI Extracted Data:", response.data);

        dispatch(
          updateInteraction({
            ...response.data,
            id: response.id,
          }),
        );
      }

      const botReply = response?.reply || response?.message || "Done 👍";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: botReply,
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Failed to connect with backend",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "calc(100vh - 48px)",
        maxHeight: "calc(100vh - 48px)",
        display: "flex",
        flexDirection: "column",
        p: 2,
        borderRadius: 3,
      }}
    >
      {/* Header */}

      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={2}
        sx={{ flexShrink: 0 }}
      >
        <Avatar>
          <SmartToyIcon />
        </Avatar>

        <Box>
          <Typography variant="h6" fontWeight="bold">
            AI Assistant
          </Typography>

          <Chip label="LangGraph Agent" size="small" color="success" />
        </Box>
      </Box>

      {/* Messages */}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mb: 2,
          minHeight: 0,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Box
              sx={{
                maxWidth: "75%",
                p: 1.5,
                borderRadius: 2,
                background: msg.role === "user" ? "#1976d2" : "#eeeeee",

                color: msg.role === "user" ? "white" : "black",
              }}
            >
              {msg.content}
            </Box>
          </Box>
        ))}

        {loading && <Typography variant="caption">AI is typing...</Typography>}

        {/* Invisible anchor used to auto-scroll to the bottom */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}

      <Box display="flex" gap={1} sx={{ flexShrink: 0 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type interaction details..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
}
