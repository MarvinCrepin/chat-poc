import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import axios from 'axios';
import Chat from '../../components/chat/Chat';

function ChatroomList() {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/chatrooms')
      .then(response => {
        setChatRooms(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des chatrooms : ', error);
      });
  }, []);

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  const handleCloseChat = (chatId) => {
    axios.post('http://localhost:8080/chatrooms/close', { chatId })
      .then(response => {
        console.log('Chat fermé avec succès.');
        // Actualiser la liste des chatrooms après la fermeture du chat
        setChatRooms(prevChatRooms => prevChatRooms.filter(chatRoom => chatRoom.id !== chatId));
      })
      .catch(error => {
        console.error('Erreur lors de la fermeture du chat : ', error);
      });
  };

  const handleCreateChat = (userId) => {
    axios.post('http://localhost:8080/chatrooms/create', { userId })
      .then(response => {
        console.log('Chat créé avec succès.');
        // Ajouter le nouveau chat à la liste des chatrooms
        setChatRooms(prevChatRooms => [...prevChatRooms, response.data]);
      })
      .catch(error => {
        console.error('Erreur lors de la création du chat : ', error);
      });
  };

  return (
    selectedChatId ? <Chat chatId={selectedChatId} /> :
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead> 
              <TableRow>
                <TableCell>Date de début</TableCell>
                <TableCell>Date de fin</TableCell>
                <TableCell>Utilisateur</TableCell>
                <TableCell>En attente</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chatRooms.map(chatRoom => (
                <TableRow key={chatRoom.id}>
                  <TableCell>{new Date(chatRoom.startDate).toLocaleString()}</TableCell>
                  <TableCell>{chatRoom.endDate ? new Date(chatRoom.endDate).toLocaleString() : 'En cours'}</TableCell>
                  <TableCell>{chatRoom.userId}</TableCell>
                  <TableCell>{chatRoom.pending ? 'Oui' : 'Non'}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => setSelectedChatId(chatRoom.id)}>Rejoindre le chat</Button>
                    <Button variant="contained" onClick={() => handleCloseChat(chatRoom.id)}>Fermer le chat</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" onClick={() => handleCreateChat(1)}>Créer un nouveau chat</Button>
      </Container>
  );
}

export default ChatroomList;
