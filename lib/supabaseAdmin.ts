import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !secretKey) {
  throw new Error('Faltan las variables de entorno de Supabase Admin (URL o SECRET_KEY)');
}

export const supabaseAdmin = createClient(supabaseUrl, secretKey);