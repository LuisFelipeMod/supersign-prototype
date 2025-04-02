"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useState, useEffect } from "react";

type Document = {
  id: string;
  userId: string;
  name: string;
  fileKey: string;
  status: string;
  signedAt?: string;
};

type DigitalSignatureProps = {
  userEmail: string;
};

export default function DigitalSignature({ userEmail }: DigitalSignatureProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [userId, setUserId] = useState<[] | {}>([]);

  
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

  const signDocument = async (id: string, fileKey: string) => {
    await fetch(`/api/documents/sign/${fileKey}`, {
      method: "POST",
      body: JSON.stringify({ fileKey }),
      headers: { "Content-Type": "application/json" },
    });
    fetchDocuments();
  };

  useEffect(() => {
    fetchDocuments();
    fetchUserId();
  }, []);

  return (
    <>
      <Card className="p-4 space-y-4">
        <CardContent>
          <h1 className="text-xl font-bold">Assinatura Digital</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assinado Em</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => doc.userId === userId ? (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>
                    {doc.status === "PENDING" ? "Não Assinado" : "Assinado"}
                  </TableCell>
                  <TableCell>
                    {doc.signedAt
                      ? format(new Date(doc.signedAt as string), "dd/MM/yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {doc.status === "SIGNED" ? (
                      <span className="text-green-500">Assinado</span>
                    ) : (
                      <Button onClick={() => signDocument(doc.id, doc.fileKey)}>
                        Assinar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ): <></>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
