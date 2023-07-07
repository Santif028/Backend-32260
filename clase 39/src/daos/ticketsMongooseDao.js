import { ticketModel } from "../models/tickets.model.js";
import { ContenedorMongoDb } from "../persistence/mongoDbPersistence";

class TicketsDAOMongoDb extends ContenedorMongoDb {
    async createNewTicket(ticket) {
        try {
            const newTicket = await this.save(ticket);
            return newTicket;
        } catch (error) {
            throw new Error(error)
        }
    }

    async findTicketById(tid) {
        try {
            let existTicket = await ticketModel.findOne({ _id: tid });
            if (!existTicket) {
                return { error: `Ticket with id: ${tid} not found` }
            } else {
                return existTicket;
            }
        } catch (error) {
            throw  new Error(error);
        }

    }
}

export default TicketsDAOMongoDb;