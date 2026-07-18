const now = new Date();
const hour = now.getHours();
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : hour < 21 ? 'Good evening' : 'Good night';
const year = document.querySelector('#year');
const date = document.querySelector('.dash-top small');
const greetingText = document.querySelector('.dash-top h2');
if (year) year.textContent = now.getFullYear();
if (date) date.textContent = new Intl.DateTimeFormat(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
if (greetingText) greetingText.textContent = `${greeting}, Hannington`;

// Add your Supabase project URL and publishable/anon key to enable analytics.
// Never put a Supabase service_role key in this public file.
const ANALYTICS_CONFIG = { url: 'YOUR_SUPABASE_URL', anonKey: 'YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY' };
const analyticsEnabled = !Object.values(ANALYTICS_CONFIG).some(value => value.startsWith('YOUR_'));
const visitorKey = 'trent_visitor_id';
const visitorId = localStorage.getItem(visitorKey) || crypto.randomUUID();
localStorage.setItem(visitorKey, visitorId);
async function track(eventName) {
  if (!analyticsEnabled) return;
  try { await fetch(`${ANALYTICS_CONFIG.url}/rest/v1/analytics_events`, { method: 'POST', headers: { apikey: ANALYTICS_CONFIG.anonKey, Authorization: `Bearer ${ANALYTICS_CONFIG.anonKey}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ event_name: eventName, page_path: location.pathname, visitor_id: visitorId }) }); } catch (_) { /* Analytics never interrupts the public site. */ }
}
track('page_view');
document.querySelectorAll('[data-track]').forEach(link => link.addEventListener('click', () => track(link.dataset.track)));
