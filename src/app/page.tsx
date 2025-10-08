"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Eye, Mail, Ticket } from "@/assets";
import Button from "@/components/Button";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    router.push('/dashboard');
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-background">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center mb-8">
            <div className="bg-brandPrimary rounded-lg p-3 mr-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-lightText">
                EventManager
              </h1>
              <p className="text-sm text-gray-600">
                Gerencie seus eventos com facilidade
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-lightText mb-2">
              Entrar na sua conta
            </h2>
            <p className="text-gray-600 mb-8">
              Acesse o painel de gestão de eventos
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-lightText mb-2"
                >
                  Email
                </label>
                 <div className="relative flex items-center h-12 px-4 pr-4 border border-inputBorder rounded-lg bg-white focus-within:ring-2 focus-within:ring-brandPrimary focus-within:border-transparent transition-all">
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent text-lightText placeholder-gray-400 focus:outline-none self-center"
                    required
                  />
                  <Mail className="h-[12px] w-[16px] text-gray-400 self-center" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-lightText mb-2"
                >
                  Senha
                </label>
                 <div className="flex items-center h-12 px-4 pr-4 border border-inputBorder rounded-lg bg-white focus-within:ring-2 focus-within:ring-brandPrimary focus-within:border-transparent transition-all">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 bg-transparent text-lightText placeholder-gray-400 focus:outline-none self-center"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center justify-center h-5 w-5 text-gray-400 hover:text-lightText transition-colors self-center rounded cursor-pointer"
                  >
                    {showPassword ? (
                      <Eye fill="darkText" className="h-[14px] w-[18px]" />
                    ) : (
                      <Eye className="h-[14px] w-[18px]" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit">Entrar</Button>
            </form>
            <div className="mt-6 text-center">
              <span className="text-gray-600">ou</span>
            </div>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <button 
                  onClick={goToSignup}
                  className="text-brandPrimary hover:text-brandPrimary/80 font-medium transition-colors hover:underline cursor-pointer"
                >
                  Criar conta
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-20 xl:px-24 bg-darkBg">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-8 w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
            <Ticket className="h-[23px] w-[34px] text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-darkText mb-6">
            Gerencie Eventos com Eficiência
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Controle total sobre seus eventos, setores, cupons e vendas em uma
            única plataforma intuitiva e poderosa.
          </p>
        </div>
      </div>
    </div>
  );
}
