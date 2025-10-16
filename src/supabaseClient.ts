import { createClient, PostgrestResponse } from "@supabase/supabase-js";

// Define the shape of your "events" table
export interface Event {
  id: number;
  created_at: Date;
  // Add other fields as needed
}

const supabaseUrl: string =  "https://vascgynbztwepxpenkiq.supabase.co/" as string;
const supabaseAnonKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhc2NneW5ienR3ZXB4cGVua2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0Njg3OTMsImV4cCI6MjA3NjA0NDc5M30.263x7iXLIi0unSsM0rPaJX4OYe8H6mVf-U3Hj9bGD0k" as string;

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