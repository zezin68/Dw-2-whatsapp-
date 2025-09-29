import { createClient } from "@supabase/supabase-js";

const URL_SUP = import.meta.env.VITE_SUPABASE_URL;
const KEY_SUP = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(URL_SUP, KEY_SUP);

export default supabase;
