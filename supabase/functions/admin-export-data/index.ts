// Edge Function: admin-export-data
// Exports all project data as JSON for admins (bypasses RLS via service role).
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

const TABLES = [
  'menu_items',
  'hotel_rooms',
  'guest_reviews',
  'restaurant_images',
  'restaurant_info',
  'special_events',
  'website_settings',
  'profiles',
  'user_roles',
  'affiliate_links',
  'affiliate_programs',
  'analytics',
  'api_credentials',
  'subscriptions',
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
    const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const token = authHeader.replace('Bearer ', '');

    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await userClient.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized', detail: userErr?.message }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const userId = userData.user.id;

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    const { data: isAdmin, error: roleErr } = await admin.rpc('has_role', {
      _user_id: userId,
      _role: 'admin',
    });
    if (roleErr || !isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: admin role required', detail: roleErr?.message }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const tables: Record<string, unknown> = {};
    const errors: Record<string, string> = {};

    for (const t of TABLES) {
      const { data, error } = await admin.from(t as any).select('*');
      if (error) {
        errors[t] = error.message;
      } else {
        tables[t] = data ?? [];
      }
    }

    const payload = {
      exported_at: new Date().toISOString(),
      exported_by: userId,
      project: 'artemis',
      tables,
      errors: Object.keys(errors).length ? errors : undefined,
    };

    return new Response(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error('export error', e);
    return new Response(JSON.stringify({ error: e?.message ?? 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
