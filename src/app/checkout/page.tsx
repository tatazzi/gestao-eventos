"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Ticket, Qrcode } from "@/assets";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentCode, setPaymentCode] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const generateRandomCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    setPaymentCode(generateRandomCode());
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isPaid) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isPaid]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePayment = () => {
    setIsPaid(true);
  };

  const handleBackToEvents = () => {
    router.push('/events');
  };

  const eventId = searchParams.get('eventId');
  const eventName = searchParams.get('eventName') || 'Evento';
  const price = searchParams.get('price') || '80,00';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gray-900 rounded-lg p-2 mr-3">
                <Ticket className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EventosApp</span>
            </div>
            <button
              onClick={handleBackToEvents}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar aos Eventos</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isPaid ? 'Pagamento Confirmado!' : 'Finalizar Compra'}
            </h1>
            <p className="text-gray-600">
              {isPaid ? 'Seu ingresso foi gerado com sucesso!' : `Evento: ${eventName}`}
            </p>
          </div>

          {!isPaid ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Evento:</span>
                    <span className="font-medium text-gray-900">{eventName}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Quantidade:</span>
                    <span className="font-medium text-gray-900">1 ingresso</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Valor unitário:</span>
                    <span className="font-medium text-gray-900">R$ {price}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-lg font-bold text-gray-900">R$ {price}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center">
                    <span className="text-red-600 font-medium">
                      Tempo restante: {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Pagamento via PIX</h2>
                
                  <div className="bg-white border-2 border-gray-300 rounded-lg p-8 mb-6 flex flex-col items-center">
                    <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-white border-2 border-gray-400 rounded-lg mx-auto mb-2 flex items-center justify-center overflow-hidden">
                            <Qrcode className="h-364 w-364" />
                        </div>
                        <p className="text-xs text-gray-500">QR Code PIX</p>
                      </div>
                    </div>
                  
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Escaneie o QR Code com seu aplicativo de banco ou copie o código abaixo
                  </p>
                  
                  <div className="bg-gray-100 rounded-lg p-4 w-full">
                    <p className="text-sm text-gray-600 mb-2">Código PIX:</p>
                    <div className="bg-white border border-gray-300 rounded p-3 font-mono text-sm break-all">
                     
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(`${paymentCode}-${Date.now().toString().slice(-6)}`)}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Copiar código
                    </button>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                >
                Pagamento
                </button>
              </div>
            </div>
          ) : (

            <div className="text-center">
             
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pagamento Realizado!</h2>
              <p className="text-gray-600 mb-6">
                Seu ingresso foi gerado e enviado para seu email.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Código do Ingresso:</h3>
                <div className="bg-white border border-gray-300 rounded p-3 font-mono text-lg font-bold text-gray-900">
                  {paymentCode}-{Date.now().toString().slice(-6)}
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleBackToEvents}
                  className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Ver Mais Eventos
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Imprimir Ingresso
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
