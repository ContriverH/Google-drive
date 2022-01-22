import React from "react";
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import Folder from "./Folder";
import File from "./File";
import Navbar from "./NavbarComponent";
import { useLocation, useParams } from "react-router-dom";
import FolderBreadcrums from "./FolderBreadcrums";
import AddFileButton from "./AddFileButton";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  // console.log(state);
  const { folder, childFolders, childFiles } = useFolder(folderId);

  return (
    <>
      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrums currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                className="p-2"
                style={{ maxWidth: "250px" }}
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => (
              <div
                key={childFile.id}
                className="p-2"
                style={{ maxWidth: "250px" }}
              >
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
