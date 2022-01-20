import React from "react";
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import Folder from "./Folder";
import Navbar from "./NavbarComponent";
import { useLocation, useParams } from "react-router-dom";
import FolderBreadcrums from "./FolderBreadcrums";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  // console.log(state);
  const { folder, childFolders } = useFolder(folderId);

  return (
    <>
      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrums currentFolder={folder} />
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
      </Container>
    </>
  );
}
