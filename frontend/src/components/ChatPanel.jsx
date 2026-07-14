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
import { tokens, entityColors } from "../theme/tokens";

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(79, 209, 179, 0.45); }
  70%  { box-shadow: 0 0 0 6px rgba(79, 209, 179, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 209, 179, 0); }
`;

const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
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
            bgcolor: "#5E7377",
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
  content: "Hi — tell me about the interaction and I'll structure it for you.",
  time: formatTime(),
};

// =====================================================
// Entity highlighting — pulls known values straight out of
// the current interaction state, so tags always match what
// actually landed in the form on the left, not a static list.
// =====================================================

function buildEntities(interaction) {
  const entities = [];

  const push = (value, type, label) => {
    const v = (value || "").trim();
    if (v.length > 1) entities.push({ value: v, type, label });
  };

  push(interaction.hcpName, "hcp", "HCP");
  push(interaction.product, "product", "Product");

  (interaction.productsDiscussed || "")
    .split(",")
    .forEach((v) => push(v, "product", "Product"));

  (interaction.topicsDiscussed || "")
    .split(",")
    .forEach((v) => push(v, "topic", "Topic"));

  (interaction.materialsShared || "")
    .split(",")
    .forEach((v) => push(v, "material", "Material"));

  // Longest first so "GlucoBalance 10" wins over a shorter partial match
  const seen = new Set();
  return entities
    .filter((e) => {
      const key = e.value.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.value.length - a.value.length);
}

function EntityTag({ text, type, label }) {
  const c = entityColors[type];
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "1px 4px 1px 2px",
        borderRadius: "4px",
        fontWeight: 600,
        bgcolor: c.bg,
        color: c.ink,
      }}
    >
      {text}
      <Box
        component="span"
        sx={{
          fontFamily: tokens.monoFont,
          fontSize: "8px",
          fontWeight: 600,
          letterSpacing: "0.03em",
          padding: "2px 5px",
          borderRadius: "3px",
          bgcolor: c.label,
          color: "#12191D",
          textTransform: "uppercase",
          transform: "translateY(-1px)",
        }}
      >
        {label}
      </Box>
    </Box>
  );
}

function renderHighlighted(text, entities) {
  if (!entities.length) return text;

  const escaped = entities.map((e) =>
    e.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    const match = entities.find(
      (e) => e.value.toLowerCase() === part.toLowerCase(),
    );
    if (match) {
      return (
        <EntityTag key={i} text={part} type={match.type} label={match.label} />
      );
    }
    return part;
  });
}

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

  const entities = buildEntities(interaction);

  // =====================================================
  // Start a fresh interaction (clears Redux id + chat)
  // =====================================================
  const handleNewInteraction = () => {
    dispatch(resetInteraction());

    setMessages([
      {
        role: "assistant",
        content:
          "Hi — tell me about the interaction and I'll structure it for you.",
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
              "That interaction no longer exists, so I've started a new one. Please resend your message.",
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

      const botReply = response?.reply || response?.message || "Done.";

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
          content: "Failed to connect with backend.",
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
        borderRadius: "14px",
        overflow: "hidden",
        fontFamily: tokens.bodyFont,
        bgcolor: tokens.panel,
        color: "#EAF1EF",
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
          borderBottom: `1px solid ${tokens.panelLine}`,
          flexShrink: 0,
        }}
      >
        <Avatar
          sx={{
            background: `linear-gradient(135deg, ${tokens.teal}, ${tokens.tealDeep})`,
            width: 34,
            height: 34,
          }}
        >
          <AutoAwesomeRoundedIcon fontSize="small" sx={{ color: "#fff" }} />
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: tokens.bodyFont,
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#fff",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            AI assistant
          </Typography>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.25 }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#4FD1B3",
                animation: `${pulse} 2s infinite`,
              }}
            />
            <Typography
              sx={{
                fontFamily: tokens.bodyFont,
                fontSize: "0.72rem",
                color: tokens.panelSoft,
                fontWeight: 500,
              }}
            >
              Active · LangGraph agent
            </Typography>
          </Box>
        </Box>

        <Tooltip title="Start new interaction">
          <IconButton
            onClick={handleNewInteraction}
            sx={{
              color: tokens.panelSoft,
              "&:hover": {
                bgcolor: tokens.panelLine,
                color: "#fff",
              },
            }}
          >
            <AddCommentRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Entity legend */}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 12px",
          px: 2.5,
          py: 1.25,
          borderBottom: `1px solid ${tokens.panelLine}`,
        }}
      >
        {Object.entries(entityColors).map(([key, c]) => (
          <Box
            key={key}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "10.5px",
              color: "#7C8F92",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "2px",
                bgcolor: c.label,
              }}
            />
            {key}
          </Box>
        ))}
      </Box>

      {/* Messages */}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          minHeight: 0,
          px: 2.5,
          py: 2,
          bgcolor: tokens.panelCanvas,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: tokens.panelLine,
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
                  maxWidth: "88%",
                  px: 1.75,
                  py: 1.25,
                  fontFamily: tokens.bodyFont,
                  fontSize: "0.875rem",
                  lineHeight: 1.65,
                  color: "#EAF1EF",
                  bgcolor: isUser ? tokens.panelBubble : "#1B262A",
                  border: `1px solid ${isUser ? tokens.panelBubbleLine : tokens.panelLine}`,
                  borderRadius: isUser
                    ? "12px 12px 4px 12px"
                    : "12px 12px 12px 4px",
                }}
              >
                {isUser
                  ? renderHighlighted(msg.content, entities)
                  : msg.content}
              </Box>

              <Typography
                sx={{
                  fontFamily: tokens.monoFont,
                  fontSize: "0.62rem",
                  color: "#5E7377",
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
              bgcolor: "#1B262A",
              border: `1px solid ${tokens.panelLine}`,
              borderRadius: "12px 12px 12px 4px",
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
          borderTop: `1px solid ${tokens.panelLine}`,
          bgcolor: tokens.panel,
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
              bgcolor: "#1B262A",
              color: "#EAF1EF",
              fontFamily: tokens.bodyFont,
              fontSize: "0.875rem",
              "& fieldset": {
                borderColor: tokens.panelLine,
              },
              "&:hover fieldset": {
                borderColor: tokens.teal,
              },
              "&.Mui-focused fieldset": {
                borderColor: tokens.teal,
                borderWidth: "1.5px",
              },
            },
            "& input::placeholder": {
              color: "#5E7377",
              opacity: 1,
            },
          }}
        />

        <IconButton
          onClick={handleSend}
          disabled={loading || !input.trim()}
          sx={{
            bgcolor: tokens.teal,
            color: "#FFFFFF",
            width: 40,
            height: 40,
            transition: "background-color 0.15s ease",
            "&:hover": {
              bgcolor: tokens.tealDeep,
            },
            "&.Mui-disabled": {
              bgcolor: "#2A3A3E",
              color: "#5E7377",
            },
          }}
        >
          <SendRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
}
