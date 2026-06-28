import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oveiwvinfwvhirhgegdr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZWl3dmluZnd2aGlyaGdlZ2RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NjQwMjksImV4cCI6MjA5ODA0MDAyOX0.1P4F5vePJepUtGVX3JlMzOFhGT7crd-QLHS-kXdpJ1U";

export const supabase = createClient(supabaseUrl, supabaseKey);
