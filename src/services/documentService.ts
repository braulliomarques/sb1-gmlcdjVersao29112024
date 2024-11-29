import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, set, update, serverTimestamp } from 'firebase/database';
import { storage, db } from '../lib/firebase';
import { v4 as uuidv4 } from 'uuid';

export async function uploadDocument(
  employeeId: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  const fileId = uuidv4();
  const fileExtension = file.name.split('.').pop();
  const fileName = `${fileId}.${fileExtension}`;
  const filePath = `documents/${employeeId}/${fileName}`;
  
  const storageRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Save document metadata to database
          const documentRef = dbRef(db, `documents/${fileId}`);
          await set(documentRef, {
            id: fileId,
            employeeId,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            uploadedAt: serverTimestamp(),
            downloadURL,
            status: 'pending',
          });

          resolve(fileId);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}

export async function approveDocument(documentId: string) {
  const documentRef = dbRef(db, `documents/${documentId}`);
  await update(documentRef, {
    status: 'approved',
    approvedAt: serverTimestamp(),
  });
}

export async function rejectDocument(documentId: string) {
  const documentRef = dbRef(db, `documents/${documentId}`);
  await update(documentRef, {
    status: 'rejected',
    rejectedAt: serverTimestamp(),
  });
}