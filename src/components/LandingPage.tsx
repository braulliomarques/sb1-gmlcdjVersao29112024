import React from 'react';
import { 
  BarChart3, 
  Clock, 
  Users, 
  Building, 
  Shield, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

type LandingPageProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

export function LandingPage({ onLoginClick, onRegisterClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Arllo Ponto</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onLoginClick}
                className="text-foreground hover:text-primary transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={onRegisterClick}
                className="btn btn-primary"
              >
                Criar Conta Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Simplifique o RH dos seus clientes com nossa solução completa
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Gerencie ponto eletrônico, folha de pagamento e documentos em uma única plataforma. 
              Aumente sua receita oferecendo uma solução moderna para seus clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onRegisterClick}
                className="btn bg-white text-primary hover:bg-white/90 text-lg px-8 py-3"
              >
                Começar Gratuitamente
              </button>
              <button
                onClick={onLoginClick}
                className="btn bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-3"
              >
                Agendar Demonstração
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-muted-foreground">
              Ofereça uma experiência completa para seus clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Ponto Eletrônico
              </h3>
              <p className="text-muted-foreground">
                Registro de ponto com geolocalização, fotos e relatórios automáticos.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Folha de Pagamento
              </h3>
              <p className="text-muted-foreground">
                Cálculos automáticos de horas extras, faltas e benefícios.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Compliance
              </h3>
              <p className="text-muted-foreground">
                Conformidade com todas as leis trabalhistas e backup em nuvem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Benefícios para seu escritório
            </h2>
            <p className="text-xl text-muted-foreground">
              Aumente sua eficiência e faturamento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Nova fonte de receita
                  </h3>
                  <p className="text-muted-foreground">
                    Ofereça um serviço adicional e aumente seu faturamento mensal.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Automatização
                  </h3>
                  <p className="text-muted-foreground">
                    Reduza o trabalho manual e elimine erros nos cálculos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Fidelização de clientes
                  </h3>
                  <p className="text-muted-foreground">
                    Fortaleça o relacionamento oferecendo mais valor.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-bold text-card-foreground mb-6">
                Comece agora mesmo
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>14 dias grátis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Sem cartão de crédito</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Suporte completo</span>
                </li>
              </ul>
              <button
                onClick={onRegisterClick}
                className="w-full btn btn-primary flex items-center justify-center"
              >
                Criar Conta Grátis
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/20 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-foreground">Arllo Ponto</span>
              </div>
              <p className="text-muted-foreground">
                Solução completa para gestão de ponto eletrônico e RH.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Produto</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Arllo Ponto. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}