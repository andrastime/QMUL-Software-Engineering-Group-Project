import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dswpmnhkvgpxqapgddfe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzd3BtbmhrdmdweHFhcGdkZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjYzNTgsImV4cCI6MjAyNjAwMjM1OH0.IBBT3bh87_nDHckwlR434DuHI1UvcoVypfcJH90s4eA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
