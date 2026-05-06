import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;
const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
  console.warn("Variáveis de ambiente do Cloudflare R2 não estão totalmente configuradas.");
}

export const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
});

export async function uploadFileToR2(file: File, folderPath: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  
  // Limpar nome do arquivo para URL friendly e adicionar timestamp
  const safeFilename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
  const uniqueKey = `${folderPath}/${Date.now()}-${safeFilename}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: uniqueKey,
    Body: buffer,
    ContentType: file.type,
  });

  await s3Client.send(command);

  // Retorna a URL pública combinando o Domínio Público do R2 configurado
  const finalUrl = `${publicUrl.replace(/\/$/, "")}/${uniqueKey}`;
  return finalUrl;
}
