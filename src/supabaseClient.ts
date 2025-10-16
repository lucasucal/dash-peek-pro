import { createClient, PostgrestResponse } from "@supabase/supabase-js";

// Define the shape of your "events" table
export interface Event {
  id: number;
  created_at: Date;
  // Add other fields as needed
}

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchEvents(): Promise<Event[]> {
  const response: PostgrestResponse<Event> = await supabase
    .from("events")
    .select("*");
  if (response.error) {
    console.error("Error fetching events:", response.error);
    return [];
  }
  return response.data ?? [];
}