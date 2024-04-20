import React, { useCallback, useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Grid } from '@mui/material';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function Message({ text, sentByMe }) {
  return (
    <Grid container justifyContent={sentByMe ? 'flex-end' : 'flex-start'} style={{ marginBottom: '0.5rem' }}>
      <Grid item xs={8}>
      { <Typography>{sentByMe ? 'Envoyé par vous' : "Envoyé par l'autre utilisateur"}</Typography>}
        <Paper elevation={3} style={{ padding: '0.5rem', maxWidth: '80%', backgroundColor: sentByMe ? '#DCF8C6' : '#FFFFFF' }}>
          <Typography variant="body1">{text}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

function Chat({ chatId }) {
  const socketUrl = `ws://localhost:8080/chats/${chatId}`;
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
  const [sentByMeHistory, setSentByMeHistory] = useState<string[]>([])
  const [message, setMessage] = useState('');
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage)
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const handleSendMessage = (message: string) => {
    sendMessage(message)
    setSentByMeHistory([...sentByMeHistory, message])
    setMessage('')
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        {messageHistory.map((message, idx) => (
          <>
            <Message key={idx} text={message ? message.data : null} sentByMe={sentByMeHistory.includes(message.data)} />
          </>
        ))}
      </div>
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '1rem' }}
        onClick={() => handleSendMessage(message)}
        disabled={readyState !== ReadyState.OPEN}
      >
        Envoyer
      </Button>
      <span style={{ marginLeft: '1rem' }}>Statut de la connexion : {connectionStatus}</span>
    </div>
  );
}

export default Chat;
