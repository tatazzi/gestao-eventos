"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Ticket } from "@/assets";

interface PublicEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  status: string;
  ticketsSold: number;
  totalTickets: number;
}

export default function PublicEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleBuyTicket = (event: PublicEvent) => {
    const price = "80,00";
    
    const params = new URLSearchParams({
      eventId: event.id,
      eventName: event.name,
      price: price
    });
    
    router.push(`/checkout?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando eventos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gray-900 rounded-lg p-2 mr-3 align-middle">
                <Ticket className=" h-9 w-9 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 align-middle">EventosApp</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Eventos Disponíveis
          </h1>
          <p className="text-gray-600">
            Encontre os melhores eventos da sua região
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 font-medium">Imagem do Evento</span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {event.name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <span className="text-sm">{event.venue} - {event.location}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleBuyTicket(event)}
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum evento disponível no momento.</p>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                <div className="bg-white rounded-lg p-2 mr-3">
                  <Ticket className="h-5 w-5 text-gray-900" />
                </div>
                <span className="text-lg font-bold">EventosApp</span>
              </div>
              <p className="text-gray-300 text-sm">
                A melhor plataforma para encontrar e comprar ingressos para os melhores eventos.
              </p>
            </div>
            
            <div className="text-gray-300 text-sm">
              © 2025 EventosApp. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
