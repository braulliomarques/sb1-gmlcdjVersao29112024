import React, { useState } from 'react';
import { Edit, Trash2, Search, Users, Building } from 'lucide-react';
import { useRealTimeData } from '../hooks/useRealTimeData';
import { deleteAccountant, updateAccountant } from '../services/api';
import { AccountantEditModal } from './AccountantEditModal';

export function AccountantList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingAccountant, setEditingAccountant] = useState<any>(null);
  
  const { data: accountants, loading: loadingAccountants } = useRealTimeData('accountants');

  const handleDelete = async (accountantId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este contador?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteAccountant(accountantId);
    } catch (err) {
      setError('Erro ao excluir contador. Tente novamente.');
      console.error('Error deleting accountant:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (accountant: any) => {
    setEditingAccountant(accountant);
  };

  const handleUpdate = async (updatedData: any) => {
    setLoading(true);
    setError(null);

    try {
      await updateAccountant(editingAccountant.id, updatedData);
      setEditingAccountant(null);
    } catch (err) {
      setError('Erro ao atualizar contador. Tente novamente.');
      console.error('Error updating accountant:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAccountants = accountants?.filter((accountant: any) =>
    accountant.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    accountant.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loadingAccountants) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Contadores Parceiros</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar contador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clientes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccountants?.map((accountant: any) => (
                <tr key={accountant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        {accountant.company}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{accountant.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {accountant.clientCount || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      accountant.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {accountant.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(accountant)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Editar"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(accountant.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Excluir"
                        disabled={loading}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingAccountant && (
        <AccountantEditModal
          accountant={editingAccountant}
          onClose={() => setEditingAccountant(null)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
}