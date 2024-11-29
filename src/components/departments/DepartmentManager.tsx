import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { createDepartment, updateDepartment, deleteDepartment } from '../../services/api';

type Department = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export function DepartmentManager() {
  const [newDepartment, setNewDepartment] = useState('');
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: departments, loading: loadingDepartments } = useRealTimeData('departments');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingDepartment) {
        await updateDepartment(editingDepartment.id, {
          ...editingDepartment,
          name: newDepartment
        });
        setEditingDepartment(null);
      } else {
        await createDepartment({ name: newDepartment });
      }
      setNewDepartment('');
    } catch (err) {
      setError('Erro ao salvar departamento');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setNewDepartment(department.name);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este departamento?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteDepartment(id);
    } catch (err) {
      setError('Erro ao excluir departamento');
    } finally {
      setLoading(false);
    }
  };

  if (loadingDepartments) {
    return <div className="animate-pulse h-10 bg-muted rounded-md" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          placeholder="Nome do departamento"
          className="input flex-1"
          required
        />
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          disabled={loading}
        >
          {editingDepartment ? (
            <Edit2 className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-2">
        {departments?.map((department: Department) => (
          <div
            key={department.id}
            className="flex items-center justify-between p-3 bg-muted/20 rounded-md"
          >
            <span>{department.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(department)}
                className="p-1 hover:text-blue-600 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(department.id)}
                className="p-1 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}