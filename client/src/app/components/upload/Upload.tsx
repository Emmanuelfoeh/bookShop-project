"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import styles from "./upload.module.css";
import Image from "next/image";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  fontSize: "1rem",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#bdbdbd",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const ImageUpload = ({ setFileUpload }: any) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles: any) => {
        setFiles(acceptedFiles);
      },
    });

  if (files.length > 0) {
    setFileUpload(files);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(",")[1];
    };
    reader.readAsDataURL(files[0]);
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = files.map((file: any) => (
    <div className={styles.thumb} key={file.name}>
      <h6 className="my-2">{file.name}</h6>
      <div className={styles.thumbInner}>
        <Image
          src={URL.createObjectURL(file)}
          alt="file preview"
          width={90}
          height={90}
          className={styles.img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file: any) => URL.revokeObjectURL(file));
  }, []);

  return (
    <section className="flex flex-col items-center w-full">
      <div className="border-2 border-dashed border-orange-600 p-3">
        <div {...getRootProps(style)}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
          <em>(Only images will be accepted)</em>
        </div>
      </div>

      <aside className={styles.thumbsContainer}>{thumbs}</aside>
    </section>
  );
};

export default ImageUpload;
