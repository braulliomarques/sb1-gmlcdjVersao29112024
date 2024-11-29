import { ref, set, get, update, remove, serverTimestamp } from 'firebase/database';
import { db } from '../lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import { sendWelcomeEmail } from './emailService';
import { sendWelcomeWhatsApp } from './whatsappService';

function generateTemporaryPassword() {
  return Math.random().toString(36).slice(-8);
}

export const createAccountant = async (accountantData: any) => {
  const id = uuidv4();
  const temporaryPassword = generateTemporaryPassword();

  const accountantWithMetadata = {
    ...accountantData,
    id,
    status: 'active',
    passwordHistory: [{
      password: temporaryPassword,
      createdAt: new Date().toISOString()
    }],
    clientCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  try {
    await set(ref(db, `accountants/${id}`), accountantWithMetadata);
    
    // Send welcome email
    try {
      await sendWelcomeEmail({
        name: accountantData.name,
        email: accountantData.email,
        company: accountantData.company,
        temporaryPassword,
        userType: 'accountant'
      });
    } catch (emailError) {
      console.warn('Failed to send welcome email:', emailError);
    }

    // Send WhatsApp message
    try {
      await sendWelcomeWhatsApp({
        phone: accountantData.phone,
        userType: 'contador',
        name: accountantData.name
      });
    } catch (whatsappError) {
      console.warn('Failed to send WhatsApp message:', whatsappError);
    }

    return id;
  } catch (error) {
    console.error('Error creating accountant:', error);
    throw new Error('Failed to create accountant');
  }
};

export const updateAccountant = async (id: string, data: any) => {
  try {
    const updates = {
      ...data,
      updatedAt: serverTimestamp()
    };
    await update(ref(db, `accountants/${id}`), updates);
    return true;
  } catch (error) {
    console.error('Error updating accountant:', error);
    throw new Error('Failed to update accountant');
  }
};

export const deleteAccountant = async (id: string) => {
  try {
    await remove(ref(db, `accountants/${id}`));
    return true;
  } catch (error) {
    console.error('Error deleting accountant:', error);
    throw new Error('Failed to delete accountant');
  }
};

export const createClient = async (clientData: any, accountantId: string) => {
  const id = uuidv4();
  const temporaryPassword = generateTemporaryPassword();

  const clientWithMetadata = {
    ...clientData,
    id,
    accountantId,
    status: 'active',
    passwordHistory: [{
      password: temporaryPassword,
      createdAt: new Date().toISOString()
    }],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  try {
    await set(ref(db, `clients/${id}`), clientWithMetadata);

    // Send welcome email
    try {
      await sendWelcomeEmail({
        name: clientData.companyName,
        email: clientData.email,
        company: clientData.companyName,
        temporaryPassword,
        userType: 'client'
      });
    } catch (emailError) {
      console.warn('Failed to send welcome email:', emailError);
    }

    // Send WhatsApp message
    try {
      await sendWelcomeWhatsApp({
        phone: clientData.phone,
        userType: 'cliente',
        name: clientData.companyName
      });
    } catch (whatsappError) {
      console.warn('Failed to send WhatsApp message:', whatsappError);
    }

    // Update accountant's client count
    const accountantRef = ref(db, `accountants/${accountantId}`);
    const accountantSnapshot = await get(accountantRef);
    if (accountantSnapshot.exists()) {
      const accountant = accountantSnapshot.val();
      await update(accountantRef, {
        clientCount: (accountant.clientCount || 0) + 1,
        updatedAt: serverTimestamp()
      });
    }

    return id;
  } catch (error) {
    console.error('Error creating client:', error);
    throw new Error('Failed to create client');
  }
};

export const updateClient = async (id: string, data: any) => {
  try {
    const updates = {
      ...data,
      updatedAt: serverTimestamp()
    };
    await update(ref(db, `clients/${id}`), updates);
    return true;
  } catch (error) {
    console.error('Error updating client:', error);
    throw new Error('Failed to update client');
  }
};

export const deleteClient = async (id: string, accountantId: string) => {
  try {
    await remove(ref(db, `clients/${id}`));

    // Update accountant's client count
    const accountantRef = ref(db, `accountants/${accountantId}`);
    const accountantSnapshot = await get(accountantRef);
    if (accountantSnapshot.exists()) {
      const accountant = accountantSnapshot.val();
      await update(accountantRef, {
        clientCount: Math.max((accountant.clientCount || 1) - 1, 0),
        updatedAt: serverTimestamp()
      });
    }

    return true;
  } catch (error) {
    console.error('Error deleting client:', error);
    throw new Error('Failed to delete client');
  }
};

export const createEmployee = async (employeeData: any, clientId: string) => {
  const id = uuidv4();
  const temporaryPassword = generateTemporaryPassword();

  const employeeWithMetadata = {
    ...employeeData,
    id,
    clientId,
    status: 'active',
    passwordHistory: [{
      password: temporaryPassword,
      createdAt: new Date().toISOString()
    }],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  try {
    await set(ref(db, `employees/${id}`), employeeWithMetadata);

    // Send welcome email
    try {
      await sendWelcomeEmail({
        name: employeeData.name,
        email: employeeData.email,
        company: employeeData.company,
        temporaryPassword,
        userType: 'employee'
      });
    } catch (emailError) {
      console.warn('Failed to send welcome email:', emailError);
    }

    // Send WhatsApp message
    try {
      await sendWelcomeWhatsApp({
        phone: employeeData.phone,
        userType: 'funcionário',
        name: employeeData.name
      });
    } catch (whatsappError) {
      console.warn('Failed to send WhatsApp message:', whatsappError);
    }

    return id;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw new Error('Failed to create employee');
  }
};

export const updateEmployee = async (id: string, data: any) => {
  try {
    const updates = {
      ...data,
      updatedAt: serverTimestamp()
    };
    await update(ref(db, `employees/${id}`), updates);
    return true;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw new Error('Failed to update employee');
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    await remove(ref(db, `employees/${id}`));
    return true;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw new Error('Failed to delete employee');
  }
};

export const createDepartment = async (data: { name: string }) => {
  const id = uuidv4();
  const now = serverTimestamp();

  const departmentData = {
    id,
    name: data.name,
    createdAt: now,
    updatedAt: now
  };

  try {
    await set(ref(db, `departments/${id}`), departmentData);
    return id;
  } catch (error) {
    console.error('Error creating department:', error);
    throw new Error('Failed to create department');
  }
};

export const updateDepartment = async (id: string, data: any) => {
  try {
    const updates = {
      ...data,
      updatedAt: serverTimestamp()
    };
    await update(ref(db, `departments/${id}`), updates);
    return true;
  } catch (error) {
    console.error('Error updating department:', error);
    throw new Error('Failed to update department');
  }
};

export const deleteDepartment = async (id: string) => {
  try {
    // Check if department is being used by any employee
    const employeesRef = ref(db, 'employees');
    const snapshot = await get(employeesRef);
    
    if (snapshot.exists()) {
      const employees = Object.values(snapshot.val());
      const isUsed = employees.some((emp: any) => emp.department === id);
      
      if (isUsed) {
        throw new Error('Department is being used by employees');
      }
    }

    await remove(ref(db, `departments/${id}`));
    return true;
  } catch (error) {
    console.error('Error deleting department:', error);
    throw new Error('Failed to delete department');
  }
};