import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

export interface Event {
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

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/events`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<Event, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const newEvent = await response.json();
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      const updatedEvent = await response.json();
      setEvents(prev => prev.map(event => 
        event.id === id ? updatedEvent : event
      ));
      return updatedEvent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents,
  };
};
