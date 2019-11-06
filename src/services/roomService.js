import axios from 'axios';

class RoomService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getAllRooms(latitude, longitude, radiusInMeters) {
    return this.axios.post('/api/v01/room', { latitude, longitude, radiusInMeters }).then(({ data: rooms }) => rooms);
  }

  getAllRoomsUserId(id) {
    return this.axios.get(`/api/v01/room/me/${id}`).then(({ data: rooms }) => rooms);
  }

  getRoomById(id) {
    return this.axios.get(`/api/v01/room/${id}`).then(({ data: room }) => room);
  }

  createRoom(body) {
    return this.axios.post('/api/v01/room/new', body).then(({ data: room }) => room);
  }

  updateRoom(body) {
    return this.axios.put(`/api/v01/room/${body._id}`, body).then(({ data: room }) => room);
  }

  insertUserToRoom(id) {
    return this.axios.put(`/api/v01/room/${id}/new-user`).then(({ data: room }) => room);
  }

  deleteUserFromRoom(id) {
    return this.axios.delete(`/api/v01/room/${id}/delete-user`).then(({ data: room }) => room);
  }
}

const roomService = new RoomService();

export default roomService;
