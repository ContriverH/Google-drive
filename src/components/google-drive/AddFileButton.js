import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import { database, storage } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFileButton({ currentFolder }) {
  const { currentUser } = useAuth();

  function handleUpload(e) {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    let parentPath = "";
    if (currentFolder !== ROOT_FOLDER && currentFolder.path.length > 1) {
      let path = [];
      currentFolder.path.forEach(
        (item, index) => (path = [...path, item.name])
      );
      path.shift();
      parentPath = path.join("/");
    }

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${file.name}`
        : currentFolder.path.length > 1
        ? `${parentPath}/${currentFolder.name}/${file.name}`
        : `${currentFolder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      () => {},
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((url) =>
            database.files.add({
              url: url,
              name: file.name,
              createdAt: database.getCurrentTimestamp(),
              folderId: currentFolder.id,
              userId: currentUser.uid,
            })
          )
          .catch((e) => console.log(e));
      }
    );
  }

  return (
    <label
      className="btn btn-outline-success btn-sm mt-2"
      style={{ marginRight: "0.7rem" }}
    >
      <FontAwesomeIcon icon={faFileUpload} size="2x" />
      <input
        type="file"
        onChange={handleUpload}
        style={{ opacity: 0, position: "absolute", left: "-9999px" }}
      />
    </label>
  );
}
