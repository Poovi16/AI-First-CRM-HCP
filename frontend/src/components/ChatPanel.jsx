import { useState, useRef, useEffect } from "react";

import {
  Paper,
  Typography,
  Box,
  TextField,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AddCommentRoundedIcon from "@mui/icons-material/AddCommentRounded";

import { keyframes } from "@emotion/react";

import { useDispatch, useSelector } from "react-redux";

import { updateInteraction, resetInteraction } from "../redux/interactionSlice";
import { sendChat } from "../services/chatService";

// =====================================================
// Design tokens
// =====================================================

const tokens = {
  ink: "#0B1220", // primary text / user bubble
  inkSoft: "#4B5565", // secondary text
  canvas: "#F7F8FA", // messages area wash
  surface: "#FFFFFF", // panel surface
  line: "#E8EBF0", // hairline borders
  accent: "#0F6E5C", // clinical teal - brand accent
  accentSoft: "#EAF4F1", // tinted assistant bubble
  accentDeep: "#0C5A4A", // hover / pressed
};

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(15, 110, 92, 0.45); }
  70%  { box-shadow: 0 0 0 6px rgba(15, 110, 92, 0); }
  100% { box-shadow: 0 0 0 0 rgba(15, 110, 92, 0); }
`;

const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 1; }
`;

function TypingDots() {
  return (
    <Box sx={{ display: "flex", gap: "4px", px: 0.5, py: 0.5 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            bgcolor: tokens.accent,
            animation: `${bounce} 1.1s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </Box>
  );
}

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hi 👋 I am your AI Assistant. Tell me the interaction details.",
  time: formatTime(),
};

export default function ChatPanel() {
  const dispatch = useDispatch();

  const interaction = useSelector((state) => state.interaction);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([WELCOME_MESSAGE]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // =====================================================
  // Start a fresh interaction (clears Redux id + chat)
  // =====================================================
  const handleNewInteraction = () => {
    dispatch(resetInteraction());

    setMessages([
      {
        role: "assistant",
        content:
          "Hi 👋 I am your AI Assistant. Tell me the interaction details.",
        time: formatTime(),
      },
    ]);

    setInput("");
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
      time: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await sendChat(input.trim(), interaction.id);

      console.log("Backend Response:", response);

      // If backend says the interaction id we sent doesn't exist,
      // reset to a fresh interaction instead of getting stuck.
      if (response?.error === "Interaction not found.") {
        dispatch(resetInteraction());

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "⚠️ That interaction no longer exists, so I've started a new one. Please resend your message.",
            time: formatTime(),
          },
        ]);

        return;
      }

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
          time: formatTime(),
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Failed to connect with backend",
          time: formatTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: 500,
        maxHeight: 500,
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        border: `1px solid ${tokens.line}`,
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        bgcolor: tokens.surface,
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2.5,
          py: 2,
          borderBottom: `1px solid ${tokens.line}`,
          flexShrink: 0,
        }}
      >
        <Avatar
          sx={{
            bgcolor: tokens.accentSoft,
            color: tokens.accent,
            width: 40,
            height: 40,
          }}
        >
          <AutoAwesomeRoundedIcon fontSize="small" />
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              color: tokens.ink,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            AI Assistant
          </Typography>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.25 }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: tokens.accent,
                animation: `${pulse} 2s infinite`,
              }}
            />
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                color: tokens.inkSoft,
                fontWeight: 500,
              }}
            >
              Active · LangGraph Agent
            </Typography>
          </Box>
        </Box>

        <Tooltip title="Start New Interaction">
          <IconButton
            onClick={handleNewInteraction}
            sx={{
              color: tokens.accent,
              "&:hover": {
                bgcolor: tokens.accentSoft,
              },
            }}
          >
            <AddCommentRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Messages */}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          minHeight: 0,
          px: 2.5,
          py: 2,
          bgcolor: tokens.canvas,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#D7DCE3",
            borderRadius: 8,
          },
        }}
      >
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: isUser ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: "80%",
                  px: 1.75,
                  py: 1.25,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: isUser ? "#FFFFFF" : tokens.ink,
                  bgcolor: isUser ? tokens.ink : tokens.accentSoft,
                  border: isUser ? "none" : `1px solid #DCEAE6`,
                  borderRadius: isUser
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                }}
              >
                {msg.content}
              </Box>

              <Typography
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  color: "#9AA3AF",
                  mt: 0.5,
                  px: 0.5,
                }}
              >
                {msg.time}
              </Typography>
            </Box>
          );
        })}

        {loading && (
          <Box
            sx={{
              display: "inline-flex",
              bgcolor: tokens.accentSoft,
              border: "1px solid #DCEAE6",
              borderRadius: "16px 16px 16px 4px",
              mb: 1,
            }}
          >
            <TypingDots />
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 2,
          borderTop: `1px solid ${tokens.line}`,
          bgcolor: tokens.surface,
          flexShrink: 0,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Describe the interaction..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "999px",
              bgcolor: tokens.canvas,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              "& fieldset": {
                borderColor: tokens.line,
              },
              "&:hover fieldset": {
                borderColor: tokens.accent,
              },
              "&.Mui-focused fieldset": {
                borderColor: tokens.accent,
                borderWidth: "1.5px",
              },
            },
          }}
        />

        <IconButton
          onClick={handleSend}
          disabled={loading || !input.trim()}
          sx={{
            bgcolor: tokens.accent,
            color: "#FFFFFF",
            width: 40,
            height: 40,
            transition: "background-color 0.15s ease",
            "&:hover": {
              bgcolor: tokens.accentDeep,
            },
            "&.Mui-disabled": {
              bgcolor: "#E3E6EA",
              color: "#B0B6BE",
            },
          }}
        >
          <SendRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
}
