"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, UserPlus } from "@/assets";
import { useAuth } from "@/hooks/useAuth";

export default function Signup() {
  const router = useRouter();
  const { signup, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    establishmentName: "",
    cpfCnpj: "",
    companyName: "",
    tradeName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCPFCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      return numbers
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
  };

  const handleCPFCNPJChange = (value: string) => {
    const formatted = formatCPFCNPJ(value);
    handleInputChange('cpfCnpj', formatted);
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleInputChange('phone', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (formData.password !== formData.confirmPassword) {
      setFormError("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      setFormError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    try {
      const { confirmPassword, ...signupData } = formData;
      await signup(signupData);
      
      router.push('/dashboard');
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const goToLogin = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-background">
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex items-center mb-8">
            <div className="bg-brandPrimary rounded-lg p-3 mr-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-lightText">
                EventManager
              </h1>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-lightText mb-2">
                Criar Conta
              </h2>
              <p className="text-gray-600">
                Cadastre-se para começar a gerenciar seus eventos
              </p>
            </div>

            {(error || formError) && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center">
                  {formError || error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-lightText mb-2"
                  >
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="establishmentName"
                    className="block text-sm font-medium text-lightText mb-2"
                  >
                    Nome do Estabelecimento <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="establishmentName"
                    type="text"
                    placeholder="Nome do seu estabelecimento"
                    value={formData.establishmentName}
                    onChange={(e) => handleInputChange('establishmentName', e.target.value)}
                    className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cpfCnpj"
                  className="block text-sm font-medium text-lightText mb-2"
                >
                  CPF/CNPJ <span className="text-red-500">*</span>
                </label>
                <input
                  id="cpfCnpj"
                  type="text"
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  value={formData.cpfCnpj}
                  onChange={(e) => handleCPFCNPJChange(e.target.value)}
                  className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-lightText mb-2"
                  >
                    Razão Social <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    placeholder="Razão social da empresa"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="tradeName"
                    className="block text-sm font-medium text-lightText mb-2"
                  >
                    Nome Fantasia
                  </label>
                  <input
                    id="tradeName"
                    type="text"
                    placeholder="Nome fantasia"
                    value={formData.tradeName}
                    onChange={(e) => handleInputChange('tradeName', e.target.value)}
                    className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-lightText mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center h-12 px-4 pr-4 border border-inputBorder rounded-lg bg-white focus-within:ring-2 focus-within:ring-brandPrimary focus-within:border-transparent transition-all">
                    <input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1 bg-transparent text-lightText placeholder-gray-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-lightText mb-2"
                  >
                    Telefone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-lightText mb-2"
                >
                  Senha <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center h-12 px-4 pr-4 border border-inputBorder rounded-lg bg-white focus-within:ring-2 focus-within:ring-brandPrimary focus-within:border-transparent transition-all">
                  <input
                    id="password"
                    type={"password"}
                    placeholder="Crie uma senha"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="flex-1 bg-transparent text-lightText placeholder-gray-400 focus:outline-none"
                    required
                  />
                </div>
                
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-lightText mb-2"
                >
                  Confirmar Senha <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center h-12 px-4 pr-4 border border-inputBorder rounded-lg bg-white focus-within:ring-2 focus-within:ring-brandPrimary focus-within:border-transparent transition-all">
                  <input
                    id="confirmPassword"
                    type={"password"}
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="flex-1 bg-transparent text-lightText placeholder-gray-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full max-w-xs h-12 text-base font-semibold rounded-lg bg-brandPrimary text-white hover:bg-brandPrimary/80 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Criando conta...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5" />
                      Criar Conta
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">
                Já possui uma conta?{" "}
                <button 
                  onClick={goToLogin}
                  className="text-brandPrimary hover:text-brandPrimary/80 font-medium transition-colors hover:underline cursor-pointer"
                >
                  Faça login
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
