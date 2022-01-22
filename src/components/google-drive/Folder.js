import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Folder({ folder }) {
  return (
    <>
      <Button
        as={Link}
        to={{ pathname: `/folder/${folder.id}`, state: { folder: folder } }}
        variant="outline-dark"
        className="text-truncate w-100"
      >
        <FontAwesomeIcon
          icon={faFolder}
          color="orange"
          style={{ marginRight: ".5rem" }}
        />
        {folder.name}
      </Button>
    </>
  );
}
