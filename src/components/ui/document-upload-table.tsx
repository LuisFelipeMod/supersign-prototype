"use client";

import { Card, CardContent } from "./card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";
import { Input } from "./input";
import { use, useEffect, useState } from "react";
import { format } from "date-fns";

type Document = {
  id: string;
  name: string;
  fileKey: string;
  signedAt?: string;
  status?: string;
  userId: string
};

type DocumentUploadTableProps = {
  userEmail: string;
};

export default function DocumentUploadTable({
  userEmail,
}: DocumentUploadTableProps) {
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [userId, setUserId] = useState("");

  const fetchUserId = async () => {
    const user = await (await fetch(`/api/user/${userEmail}`)).json();
    const userId = user.id;

    setUserId(userId);
  };

  const fetchDocuments = async () => {
    const response = await fetch("/api/documents");
    const data = await response.json();
    setDocuments(data);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleUpload = async (file: any) => {
    const userId = (await (await fetch(`/api/user/${userEmail}`)).json()).id;
    if (!file) {
      alert("Selecione um arquivo");
      return;
    }
    const formData = new FormData();
    formData.append("document", file);
    formData.append("userId", userId);

    await fetch("/api/documents/upload", {
      method: "POST",
      body: formData,
    });

    fetchDocuments();
  };

  useEffect(() => {
    fetchDocuments();
    fetchUserId();
  }, []);

  return (
    <Card className="p-4 space-y-4">
      <CardContent>
        <h1 className="text-xl font-bold">Upload de Documentos</h1>
        <Input className="my-5 cursor-pointer" type="file" onChange={(e) => onFileChange(e)} />
        <Button onClick={() => handleUpload(file)}>Upload</Button>
      </CardContent>

      <CardContent>
        <h2 className="text-lg font-bold">Documentos</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assinado em</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {documents ? documents.map((doc: Document) =>
              doc.userId === userId ? (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {doc.status === "SIGNED" ? "Assinado" : "Pendente"}
                  </TableCell>
                  <TableCell>
                    {doc.signedAt
                      ? format(new Date(doc.signedAt), "dd/MM/yyyy HH:mm")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`/api/documents/view/${doc.fileKey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      Visualizar
                    </a>
                  </TableCell>
                </TableRow>
              ) : (
                <></>
              )
            ): <></>}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
