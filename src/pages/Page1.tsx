//import React from 'react';
import MoveFiles from '../components/MoveFiles';

export default function MoveFilesPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📁 S3 File Manager</h1>
      <p>Drag and drop files between folders</p>
      <MoveFiles />
    </main>
  );
}
