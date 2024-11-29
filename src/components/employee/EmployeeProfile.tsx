import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, Calendar, AlertCircle, Save, FileText } from 'lucide-react';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { updateEmployee } from '../../services/api';

type EmployeeProfileProps = {
  userId: string;
};

export function EmployeeProfile({ userId }: EmployeeProfileProps) {
  const { data: employee, loading } = useRealTimeData(
    'employees',
    (emp) => emp.id === userId
  );

  const { data: departments } = useRealTimeData('departments');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    startDate: '',
    role: '',
    document: '',
    address: '',
    geofence: {
      enabled: false,
      center: [-23.5505, -46.6333] as [number, number],
      radius: 100
    }
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        department: employee.department || '',
        startDate: employee.startDate || '',
        role: employee.role || '',
        document: employee.document || '',
        address: employee.address || '',
        geofence: employee.geofence || {
          enabled: false,
          center: [-23.5505, -46.6333],
          radius: 100
        }
      });
    }
  }, [employee]);

  const getMissingFields = () => {
    const missing = [];
    const requiredFields = ['name', 'email', 'phone', 'department', 'startDate', 'role', 'document', 'address'];
    for (const field of requiredFields) {
      if (!formData[field]) missing.push(field);
    }
    return missing;
  };

  const missingFields = getMissingFields();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await updateEmployee(userId, formData);
      setSuccess(true);
    } catch (err) {
      setError('Erro ao atualizar dados. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-1/4" />
        <div className="h-32 bg-muted rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {missingFields.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                Complete seu cadastro
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                Os seguintes campos precisam ser preenchidos:
                {missingFields.map((field) => (
                  <span key={field} className="font-medium">
                    {' '}
                    {field === 'name' ? 'Nome' :
                     field === 'email' ? 'Email' :
                     field === 'phone' ? 'Telefone' :
                     field === 'department' ? 'Departamento' :
                     field === 'startDate' ? 'Data de Admissão' :
                     field === 'role' ? 'Cargo' :
                     field === 'document' ? 'CPF' :
                     field === 'address' ? 'Endereço' : field}
                    {field !== missingFields[missingFields.length - 1] && ','}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input pl-10"
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
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
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              CPF
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                value={formData.document}
                onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                className="input pl-10"
                placeholder="000.000.000-00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
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
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Departamento
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="input pl-10"
              >
                <option value="">Selecione um departamento</option>
                {departments?.map((dept: any) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Data de Admissão
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Cargo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="input pl-10"
                placeholder="Seu cargo"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Endereço Completo
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="input pl-10"
                placeholder="Rua, número, complemento, bairro, cidade, estado"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-400 p-4 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-400 p-4 rounded-lg">
            Dados atualizados com sucesso!
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}