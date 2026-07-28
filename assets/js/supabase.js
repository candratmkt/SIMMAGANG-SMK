import { CONFIG } from './config.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const supabase = (CONFIG.SUPABASE_URL && !CONFIG.DEMO_MODE)
    ? createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY)
    : null;
