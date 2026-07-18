const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY';
const OWNER_EMAIL = 'YOUR_OWNER_EMAIL';
const configured = ![SUPABASE_URL, SUPABASE_ANON_KEY, OWNER_EMAIL].some(value => value.startsWith('YOUR_'));
const errorBox = document.querySelector('#login-error');
let client;
if (!configured) errorBox.textContent = 'Dashboard setup is incomplete. Add your Supabase settings first.';
if (configured) { client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); client.auth.getSession().then(({ data }) => showSession(data.session)); }
document.querySelector('#login-form').addEventListener('submit', async event => { event.preventDefault(); if (!configured) return; errorBox.textContent = ''; const { error } = await client.auth.signInWithPassword({ email: email.value, password: password.value }); if (error) errorBox.textContent = error.message; else showSession((await client.auth.getSession()).data.session); });
document.querySelector('#sign-out').addEventListener('click', async () => { await client.auth.signOut(); location.reload(); });
document.querySelector('#refresh').addEventListener('click', loadInsights);
function showSession(session) { if (!session || session.user.email !== OWNER_EMAIL) return; document.querySelector('#login-card').hidden = true; document.querySelector('#insights').hidden = false; document.querySelector('#sign-out').hidden = false; loadInsights(); }
async function loadInsights() {
  const start = new Date(); start.setDate(start.getDate() - 30); document.querySelector('#event-status').textContent = 'Loading…';
  document.querySelector('#date-range').textContent = `Past 30 days ending ${new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date())}`;
  const { data: events, error } = await client.from('analytics_events').select('event_name, visitor_id, page_path, created_at').gte('created_at', start.toISOString()).order('created_at', { ascending: false });
  if (error) { document.querySelector('#event-status').textContent = `Could not load insights: ${error.message}`; return; }
  const count = name => events.filter(event => event.event_name === name).length;
  document.querySelector('#views').textContent = count('page_view').toLocaleString(); document.querySelector('#visitors').textContent = new Set(events.filter(event => event.event_name === 'page_view').map(event => event.visitor_id)).size.toLocaleString(); document.querySelector('#app-opens').textContent = events.filter(event => event.event_name.startsWith('open_')).length.toLocaleString(); document.querySelector('#cta-clicks').textContent = ['open_app_nav', 'open_app_hero', 'open_app_footer'].reduce((total, name) => total + count(name), 0).toLocaleString();
  const list = document.querySelector('#event-list'); list.replaceChildren(); events.slice(0, 20).forEach(event => { const item = document.createElement('li'); item.innerHTML = `<span>${event.event_name.replaceAll('_', ' ')}</span><small>${new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(event.created_at))}</small>`; list.append(item); }); document.querySelector('#event-status').textContent = events.length ? '' : 'No events have been recorded yet.';
}
