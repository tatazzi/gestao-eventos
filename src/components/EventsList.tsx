"use client";

import { useState } from "react";
import { Plus, Edit, Trash } from "@/assets";
import Modal from "./Modal";
import NewEventForm from "./NewEventForm";
import EditEventForm from "./EditEventForm";
import { useEvents, Event } from "@/hooks/useEvents";

export default function EventsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { events, loading, error, createEvent, updateEvent, deleteEvent } = useEvents();

  const handleNewEvent = async (eventData: any) => {
    try {
      await createEvent(eventData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleEditEvent = async (eventData: any) => {
    try {
      await updateEvent(eventData.id, eventData);
      setIsEditModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await deleteEvent(eventId);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleOpenEditModal = (event: Event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Carregando eventos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">Erro ao carregar eventos: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-lightText">Lista de Eventos</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
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
                    <button 
                      onClick={() => handleDeleteEvent(event.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
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
