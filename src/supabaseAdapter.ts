import { createClient } from '@supabase/supabase-js';
import type { CollectionConfig, PayloadRequest, FileData, TypeWithID } from 'payload';

// Adapter must match the Payload Cloud Storage Adapter interface
export function supabaseAdapter() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
  const bucket = process.env.SUPABASE_BUCKET!;

  return {
    name: 'supabase',
    async handleUpload({ file }: {
      file: { buffer: Buffer; mimeType: string; filename: string };
      clientUploadContext: unknown;
      collection: CollectionConfig;
  data: unknown;
      req: PayloadRequest;
    }) {
      const { filename, buffer, mimeType } = file;
      const { error } = await supabase.storage.from(bucket).upload(filename, buffer, {
        contentType: mimeType,
        upsert: true,
      });
      if (error) throw error;
    },
    async handleDelete({ filename }: {
      collection: CollectionConfig;
      doc: FileData & TypeWithID;
      filename: string;
      req: PayloadRequest;
    }) {
      const { error } = await supabase.storage.from(bucket).remove([filename]);
      if (error) throw error;
    },
    async generateURL({ filename }: {
      collection: CollectionConfig;
  data: unknown;
      filename: string;
      prefix?: string;
    }) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
      return data.publicUrl;
    },
    staticHandler: async (req: PayloadRequest, { params }: { params: { filename: string; collection: string } }) => {
      const { filename } = params;
      const { data, error } = await supabase.storage.from(bucket).download(filename);
      if (error || !data) return new Response('Not found', { status: 404 });
      return new Response(data, {
        status: 200,
        headers: { 'Content-Type': data.type },
      });
    },
  };
}
