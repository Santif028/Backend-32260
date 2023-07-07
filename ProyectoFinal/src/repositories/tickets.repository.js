import TicketsDAOMongoDb from "../daos/ticketsMongooseDao.js";
import { ticketSchema } from "../models/tickets.model.js";
import { userSchema } from "../models/users.model";
const ticketDAO = new TicketsDAOMongoDb("tickets", userSchema);

class TicketRepository {
    async createNewTicket (ticket) {
        return ticketDAO.createNewTicket(ticket);
    }

    async findTicketById  (tid) {
        return ticketDAO.findTicketById(tid);
    }
}

export default TicketRepository;