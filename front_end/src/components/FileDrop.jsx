import React, { useState } from 'react';

function FileDrop({ onFileDrop }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    setFileCount(files.length); // Update the file count
    if (onFileDrop) {
      onFileDrop(files);
    }
  };

  const fileInputRef = React.createRef();

  const handleAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setFileCount(files.length); // Update the file count
    if (onFileDrop) {
      onFileDrop(files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleAreaClick}
      style={{ border: isDragging ? '2px dashed #333' : '2px dashed #ccc', padding: '10px', cursor: 'pointer' }}
    >
      <p>{fileCount > 0 ? `${fileCount} file(s) selected` : 'Drag & Drop files here or click to select'}</p>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        multiple
      />
    </div>
  );
}

export default FileDrop;