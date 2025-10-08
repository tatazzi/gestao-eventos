"use client";

import { useState } from "react";
import { Plus, Edit, Trash } from "@/assets";
import Modal from "./Modal";
import NewEventForm from "./NewEventForm";
import EditEventForm from "./EditEventForm";

export default function EventsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState([
    {
      id: "001",
      name: "Festival de Música 2025",
      date: "15/03/2025",
      time: "19:00 - 23:00",
      venue: "Centro de Eventos",
      location: "São Paulo, SP",
      status: "Publicado",
      ticketsSold: 1250,
      totalTickets: 2000,
    },
    {
      id: "002",
      name: "Conferência Tech",
      date: "22/04/2025",
      time: "09:00 - 18:00",
      venue: "Hotel Convention",
      location: "Rio de Janeiro, RJ",
      status: "Rascunho",
      ticketsSold: 0,
      totalTickets: 500,
    },
  ]);

  const handleNewEvent = (eventData: any) => {
    setEvents(prev => [...prev, eventData]);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditEvent = (eventData: any) => {
    setEvents(prev => prev.map(event => 
      event.id === eventData.id ? eventData : event
    ));
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleOpenEditModal = (event: any) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-lightText">Lista de Eventos</h1>
        <button 
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-brandPrimary text-white px-4 py-2 rounded-lg hover:bg-brandPrimary/80 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Novo Evento
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Nome do Evento
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Data/Hora
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Local
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Ingressos
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-lightText">{event.name}</div>
                      <div className="text-sm text-gray-500">ID: #{event.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-lightText">{event.date}</div>
                  <div className="text-sm text-gray-500">{event.time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-lightText">{event.venue}</div>
                  <div className="text-sm text-gray-500">{event.location}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-lightText">
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-lightText">
                  {event.ticketsSold.toLocaleString()} / {event.totalTickets.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenEditModal(event)}
                      className="p-1 text-gray-400 hover:text-lightText transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Mostrando {events.length} resultados
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Novo Evento"
      >
        <NewEventForm
          onSubmit={handleNewEvent}
          onCancel={handleCloseModal}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Editar Evento"
      >
        {selectedEvent && (
          <EditEventForm
            eventData={selectedEvent}
            onSubmit={handleEditEvent}
            onCancel={handleCloseEditModal}
          />
        )}
      </Modal>
    </div>
  );
}
