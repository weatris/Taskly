import io, { Socket } from 'socket.io-client';
import { BACKEND_URL } from './apiFunctions/apiFunctions';
import { useEffect, useState } from 'react';

export const useSocket = ({ id }: { id: string }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(BACKEND_URL, { transports: ['websocket'] });

    newSocket.on('connect', () => {
      newSocket.emit('join_room', id);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [id]);

  return { socket };
};
