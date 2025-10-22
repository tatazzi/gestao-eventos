"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogoutIcon, User } from "@/assets";
import { useAuthStore } from "@/store/authStore";

const API_BASE_URL = 'http://localhost:3001';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!passwordData.newPassword || !passwordData.confirmNewPassword) {
      setError("Por favor, preencha todos os campos de senha");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (!user) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
      }

      const userData = await response.json();

      if (userData.password !== passwordData.currentPassword) {
        throw new Error('Senha atual incorreta');
      }

      const updateResponse = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          password: passwordData.newPassword,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Erro ao atualizar senha');
      }

      setSuccess("Senha alterada com sucesso!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-gray-700" />
          <h1 className="text-lg font-medium text-gray-900">Perfil do Usuário</h1>
        </div>
        <button 
          onClick={() => router.push("/dashboard")}
          className="flex items-center  gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className=" h-3 w-3" />
          <span>Voltar</span>
        </button>
      </header>

      <main className="mt-6 pt-16 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Dados Gerais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={user.fullName}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Estabelecimento
                </label>
                <input
                  type="text"
                  value={user.establishmentName}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={user.phone}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Razão Social
                </label>
                <input
                  type="text"
                  value={user.companyName}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Fantasia
                </label>
                <input
                  type="text"
                  value={user.tradeName}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF/CNPJ
                </label>
                <input
                  type="text"
                  value={user.cpfCnpj}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Segurança</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Alterar Senha</h3>
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600">{success}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleChangePassword}
                  disabled={loading}
                  className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Alterando..." : "Alterar Senha"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Gerenciar Sessões</h2>
            
            <div className="flex justify-start">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                <LogoutIcon className="h-4 w-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
