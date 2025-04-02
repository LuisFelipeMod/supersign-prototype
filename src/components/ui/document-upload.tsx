import { useState } from "react";
import { Card, CardContent } from "./card";
import { Input } from "./input";
import { Button } from "./button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

export default function DocumentUpload() {
  return (
    <Card className="p-4 space-y-4">
      <CardContent>
        <h1 className="text-xl font-bold">Upload de Documentos</h1>
        <Input type="file" />
        <Button>Upload</Button>
      </CardContent>

      <CardContent>
        <h2 className="text-lg font-bold">Documentos</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <a target="_blank" className="text-blue-500">
                  Visualizar
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
