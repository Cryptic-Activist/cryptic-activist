'use client';

import { FileUploaderHandle, FileUploaderProps } from './types';
import {
  MdClose,
  MdCloudUpload,
  MdInsertDriveFile,
  MdPictureAsPdf,
} from 'react-icons/md';
import React, {
  ChangeEvent,
  DragEvent,
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import DynamicIcon from '@/components/DynamicIcon';
import Image from 'next/image';
import styles from './index.module.scss';
import { useOutsideClick } from '@/hooks';

const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const FilePreview: FC<{ file: File }> = ({ file }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }

    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [file]);

  if (file.type.startsWith('image/')) {
    return (
      <>
        {preview ? (
          <Image
            height={20}
            width={20}
            src={preview}
            alt={file.name}
            className={styles.imagePreview}
          />
        ) : (
          <div className={styles.emptyPreview} />
        )}
      </>
    );
  }

  if (file.type === 'application/pdf') {
    return <MdPictureAsPdf className={styles.iconPdf} size={32} />;
  }

  return <MdInsertDriveFile className={styles.iconFile} size={32} />;
};

const FileUploader = forwardRef<FileUploaderHandle, FileUploaderProps>(
  (
    {
      allowedFileTypes,
      allowMultiple,
      onUpload,
      label = 'File Uploader',
      description = 'Images (PNG, JPG, GIF) or PDF files',
      maxFiles,
      maxFileSize,
      className,
      fullHeight = false,
      fullWidth = false,
    },
    ref
  ) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');
    const [openFileList, setOpenFileList] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateAndAddFiles = (files: FileList | null) => {
      if (!files) return;

      setError('');
      const fileArray = Array.from(files);
      const validFiles: File[] = [];

      for (const file of fileArray) {
        if (!allowedFileTypes.includes(file.type as any)) {
          setError(`Invalid type for '${file.name}'.`);
          continue;
        }
        if (maxFileSize && file.size > maxFileSize) {
          setError(`'${file.name}' exceeds size limit.`);
          continue;
        }
        validFiles.push(file);
      }

      if (maxFiles && selectedFiles.length + validFiles.length > maxFiles) {
        setError(`Cannot add more than ${maxFiles} file(s).`);
        return;
      }

      if (allowMultiple) {
        setSelectedFiles((prev) => [...prev, ...validFiles]);
      } else {
        setSelectedFiles(validFiles.slice(0, 1));
      }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      validateAndAddFiles(e.target.files);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      validateAndAddFiles(e.dataTransfer.files);
    };

    const removeFile = (index: number) => {
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
      if (selectedFiles.length === 0) {
        setError('Please select at least one file.');
        return;
      }
      setError('');
      await onUpload?.(selectedFiles);
      setSelectedFiles([]);
    };

    const toggleFilesList = () => {
      setOpenFileList((prev) => !prev);
    };

    useImperativeHandle(ref, () => ({
      upload: handleUpload,
    }));

    const filesListRef = useOutsideClick(toggleFilesList);

    return (
      <div
        className={`${styles.wrapper} ${className || ''} ${
          fullHeight ? styles.fullHeight : ''
        } ${fullWidth ? styles.fullWidth : ''}`}
      >
        <div
          className={`${styles.uploaderCard} ${
            fullHeight ? styles.fullHeight : ''
          } ${fullWidth ? styles.fullWidth : ''}`}
        >
          <div className={styles.labelFilesButton}>
            <label className={styles.title}>{label}</label>
            {selectedFiles.length > 0 && (
              <button
                className={styles.filesButton}
                onClick={toggleFilesList}
                type="button"
              >
                Files <DynamicIcon iconName="FaChevronDown" size={10} />
              </button>
            )}
          </div>
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`${styles.dropzone} ${
              isDragging ? styles.dragging : ''
            } ${fullHeight ? styles.fullHeight : ''} ${
              fullWidth ? styles.fullWidth : ''
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple={allowMultiple}
              accept={allowedFileTypes.join(',')}
              onChange={handleFileChange}
              className={styles.hidden}
            />
            <div className={styles.dropContent}>
              <MdCloudUpload
                className={`${styles.uploadIcon} ${
                  isDragging ? styles.dragIcon : ''
                }`}
              />
              <p>
                <span className={styles.clickable}>Click to upload</span> or
                drag and drop
              </p>
              <p className={styles.hint}>{description}</p>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          {openFileList && selectedFiles.length > 0 && (
            <div className={styles.fileListWrapper} ref={filesListRef}>
              <ul className={styles.fileList}>
                {selectedFiles.map((file, index) => (
                  <li key={index} className={styles.fileItem}>
                    <div className={styles.fileInfo}>
                      <FilePreview file={file} />
                      <div>
                        <span className={styles.fileName}>{file.name}</span>
                        <span className={styles.fileSize}>
                          {formatBytes(file.size)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className={styles.removeButton}
                    >
                      <MdClose className={styles.closeIcon} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FileUploader.displayName = 'FileUploader';

export default FileUploader;
