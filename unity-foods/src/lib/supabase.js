import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://prblfpgnwvrzafhovdkj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByYmxmcGdud3ZyemFmaG92ZGtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMzUyMDksImV4cCI6MjA5NDYxMTIwOX0.2WiYHALCynF1TSTfnoqh899lW7vsiHqhEW75BNIixN8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
