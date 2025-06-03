import React, { useEffect, useState } from 'react';
import { list, remove, uploadData, downloadData } from 'aws-amplify/storage';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';

// Draggable file component
function DraggableFile({ id, name }: { id: string; name: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    padding: '8px',
    border: '1px solid #ccc',
    marginBottom: '4px',
    backgroundColor: 'white',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      📄 {name}
    </div>
  );
}

// Droppable folder component
function DroppableFolder({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style: React.CSSProperties = {
    padding: '12px',
    border: '2px dashed #888',
    margin: '12px 0',
    backgroundColor: isOver ? '#f0f8ff' : '#f9f9f9',
  };

  return (
    <div ref={setNodeRef} style={style}>
      📁 {id}
      <div>{children}</div>
    </div>
  );
}

export default function MoveFiles() {
  const [files, setFiles] = useState<{ path: string; name: string }[]>([]);
  const sourceFolder = 'folder-a/';
  const targetFolder = 'folder-b/';

  const loadFiles = async () => {
    const result = await list({ path: sourceFolder });
    setFiles(result.items as { path: string; name: string }[]);
  };

  const moveFile = async (
    fileName: string,
    fromFolder: string,
    toFolder: string
  ) => {
    try {
      const download = await downloadData({
        path: `${fromFolder}${fileName}`,
      }).result;

      // ✅ Convert ReadableStream to Blob
      const stream = download.body as unknown as ReadableStream<Uint8Array>;
      const reader = stream.getReader();
      const chunks: Uint8Array[] = [];

      let result = await reader.read();
      while (!result.done) {
        chunks.push(result.value);
        result = await reader.read();
      }

      const blob = new Blob(chunks);

      // ✅ Upload the Blob to the target folder
      await uploadData({
        path: `${toFolder}${fileName}`,
        data: blob,
      }).result;

      // ✅ Remove the original file
      await remove({ path: `${fromFolder}${fileName}` });

      // ✅ Reload files
      loadFiles();
    } catch (err) {
      console.error('Move failed:', err);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const fileId = event.active.id;
    const dropTarget = event.over?.id;

    // ✅ Convert both to strings to satisfy function signature
    if (dropTarget && String(dropTarget) !== sourceFolder) {
      moveFile(String(fileId), sourceFolder, String(dropTarget));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <h2>Move Files with Drag-and-Drop</h2>

      <DroppableFolder id={sourceFolder}>
        {files.map((file) => (
          <DraggableFile key={file.path} id={file.name} name={file.name} />
        ))}
      </DroppableFolder>

      <DroppableFolder id={targetFolder}>
        <p>Drop files here to move to folder-b</p>
      </DroppableFolder>
    </DndContext>
  );
}
