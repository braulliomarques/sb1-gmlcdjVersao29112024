import React, { useState } from 'react';
import { Building, Mail, Phone, CreditCard, ArrowLeft } from 'lucide-react';
import { createAccountant } from '../services/api';

type AccountRegistrationProps = {
  onBack: () => void;
};

export function AccountRegistration({ onBack }: AccountRegistrationProps) {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    cnpj: '',
    plan: 'professional'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createAccountant(formData);
      setSuccess(true);
      setFormData({
        company: '',
        name: '',
        email: '',
        phone: '',
        cnpj: '',
        plan: 'professional'
      });
    } catch (err) {
      setError('Erro ao criar conta. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center text-primary hover:text-primary/90 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </button>
          
          <h2 className="text-3xl font-bold text-foreground">
            Crie sua conta gratuita
          </h2>
          <p className="mt-2 text-muted-foreground">
            Comece agora seus 14 dias de teste gratuito
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 dark:bg-green-900/50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
              Conta criada com sucesso!
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Enviamos um email com suas credenciais de acesso.
              Por favor, verifique sua caixa de entrada.
            </p>
            <button
              onClick={onBack}
              className="btn btn-primary"
            >
              Voltar para o início
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 p-4 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome do Escritório
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="input pl-10"
                    placeholder="Nome do seu escritório"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome do Responsável
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input pl-10"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input pl-10"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input pl-10"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  CNPJ
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    className="input pl-10"
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary py-3"
              >
                {loading ? 'Criando conta...' : 'Criar Conta Grátis'}
              </button>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Ao criar uma conta, você concorda com nossos{' '}
              <a href="#" className="text-primary hover:text-primary/90">
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a href="#" className="text-primary hover:text-primary/90">
                Política de Privacidade
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}