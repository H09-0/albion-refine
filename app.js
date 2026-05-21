// ---- Data ----
const BONUS_CITIES = {
  wood: 'FortSterling',
  ore: 'Thetford',
  fiber: 'Lymhurst',
  hide: 'Martlock',
  stone: 'Bridgewatch',
};
const RESOURCE_LABELS = {
  wood: 'Wood → Planks',
  ore: 'Ore → Metal Bars',
  fiber: 'Fiber → Cloth',
  hide: 'Hide → Leather',
  stone: 'Stone → Stone Blocks',
};
const RECIPES = {
  2: { raw: 2, filler: 0, refined: 3 },
  3: { raw: 2, filler: 1, refined: 2 },
  4: { raw: 3, filler: 1, refined: 2 },
  5: { raw: 3, filler: 1, refined: 2 },
  6: { raw: 4, filler: 1, refined: 2 },
  7: { raw: 4, filler: 1, refined: 2 },
  8: { raw: 5, filler: 1, refined: 2 },
};
const BASE_FOCUS_COST = {
  4: [54, 94, 164, 287, 503],
  5: [94, 164, 287, 503, 880],
  6: [164, 287, 503, 880, 1539],
  7: [287, 503, 880, 1539, 2694],
  8: [503, 880, 1539, 2694, 4714],
};

// ---- DOM refs ----
const $ = id => document.getElementById(id);
const resourceEl = $('resource');
const tierEl = $('tier');
const enchantEl = $('enchant');
const cityEl = $('city');
const bonusIndicator = $('bonusIndicator');
const focusToggle = $('focusToggle');
const dailyBonus = $('dailyBonus');
const stationFee = $('stationFee');
const specLevel = $('specLevel');
const rawPrice = $('rawPrice');
const refinedPrice = $('refinedPrice');
const fillerPrice = $('fillerPrice');
const fillerGroup = $('fillerGroup');
const fillerLabel = $('fillerLabel');

// ---- City bonus logic ----
function updateBonus() {
  const res = resourceEl.value;
  const city = cityEl.value;
  const isBonus = BONUS_CITIES[res] === city;
  bonusIndicator.textContent = isBonus ? '✓ +40% Bonus City' : 'No city bonus';
  bonusIndicator.className = 'badge ' + (isBonus ? 'badge-bonus' : 'badge-no-bonus');
}

resourceEl.addEventListener('change', updateBonus);
cityEl.addEventListener('change', updateBonus);

// ---- RRR Calculation ----
function calc() {
  const res = resourceEl.value;
  const tier = parseInt(tierEl.value);
  const ench = parseInt(enchantEl.value);
  const city = cityEl.value;
  const isBonus = BONUS_CITIES[res] === city;
  const useFocus = focusToggle.checked;
  const daily = parseInt(dailyBonus.value);
  const fee = parseFloat(stationFee.value) || 0;
  const spec = parseInt(specLevel.value);
  const raw = parseFloat(rawPrice.value);
  const ref = parseFloat(refinedPrice.value);

  // Base production bonus (location only, no focus)
  let baseBonus = 18;
  if (isBonus) baseBonus += 40;
  baseBonus += daily;

  // Full production bonus (with focus)
  let fullBonus = baseBonus;
  if (useFocus) fullBonus += 59;

  // Return rates
  const baseRrr = baseBonus / (100 + baseBonus);
  const baseRrrPct = (baseRrr * 100).toFixed(1);
  const fullRrr = fullBonus / (100 + fullBonus);
  const fullRrrPct = (fullRrr * 100).toFixed(1);

  const rrr = fullRrr; // Use full for profit calculations

  // Recipe
  const recipe = RECIPES[tier] || RECIPES[4];
  const rawPerCraft = recipe.raw;
  const fillerPerCraft = recipe.filler;
  const refPerCraft = recipe.refined;
  const returnedRaw = rawPerCraft * rrr;
  const netRaw = rawPerCraft - returnedRaw;
  const returnedFiller = fillerPerCraft * rrr;
  const netFiller = fillerPerCraft - returnedFiller;

  // Focus cost
  const costs = BASE_FOCUS_COST[tier] || BASE_FOCUS_COST[4];
  const baseFocus = costs[ench] || costs[0];
  const focusMult = Math.pow(0.5, spec / 10000);
  const actualFocus = Math.round(baseFocus * Math.max(focusMult, 0.0625));

  // Prices
  const filler = parseFloat(fillerPrice.value);
  const materialCost = raw ? netRaw * raw + (filler && netFiller ? netFiller * filler : 0) : null;
  const revenue = ref ? refPerCraft * ref : null;
  const stationTotal = (materialCost && fee) ? materialCost * (fee / 100) : 0;
  const profit = (materialCost !== null && revenue !== null) ? revenue - materialCost - stationTotal : null;
  const spf = (profit !== null && actualFocus > 0 && useFocus)
    ? (profit - calcProfitNoFocus(res, tier, ench, city, daily, fee, raw, ref, filler)) / actualFocus
    : null;
  const dailyProfit = spf !== null ? spf * 10000 : null;

  // Display
  $('baseRrrResult').textContent = baseRrrPct + '%';
  $('focusRrrResult').textContent = useFocus ? fullRrrPct + '%' : '— (focus off)';
  $('bonusResult').textContent = '+' + fullBonus + '%';
  $('costResult').textContent = materialCost !== null ? materialCost.toFixed(0) + ' s' : '—';
  $('fillerCostResult').textContent = (filler && netFiller) ? (netFiller * filler).toFixed(0) + ' s' : '—';
  $('revenueResult').textContent = revenue !== null ? revenue.toFixed(0) + ' s' : '—';

  const profitEl = $('profitResult');
  if (profit !== null) {
    profitEl.textContent = profit.toFixed(0) + ' s';
    profitEl.className = 'result-value ' + (profit >= 0 ? 'profit' : 'loss');
  } else {
    profitEl.textContent = '—';
    profitEl.className = 'result-value';
  }

  $('focusCostResult').textContent = useFocus ? actualFocus.toLocaleString() : 'N/A';
  $('spfResult').textContent = spf !== null ? spf.toFixed(2) + ' s' : '—';
  $('dailyProfitResult').textContent = dailyProfit !== null ? dailyProfit.toFixed(0) + ' s' : '—';

  // Breakdown
  const lines = [
    { label: 'Base production bonus', value: '+18%' },
    ...(isBonus ? [{ label: 'City specialization', value: '+40%' }] : []),
    ...(daily > 0 ? [{ label: 'Daily bonus', value: '+' + daily + '%' }] : []),
    { label: 'Location bonus total', value: '+' + baseBonus + '%', bold: true },
    { label: 'Return rate (location)', value: baseRrrPct + '%' },
    ...(useFocus ? [{ label: 'Focus adds', value: '+59%' }] : []),
    ...(useFocus ? [{ label: 'Return rate (with focus)', value: fullRrrPct + '%', bold: true }] : []),
    { label: 'Raw per craft', value: rawPerCraft + ' → ' + netRaw.toFixed(1) + ' (after return)' },
    ...(fillerPerCraft > 0 ? [{ label: 'Filler per craft', value: fillerPerCraft + ' → ' + netFiller.toFixed(2) + ' (after return)' }] : []),
    { label: 'Refined per craft', value: refPerCraft + ' units' },
  ];
  $('breakdownLines').innerHTML = lines.map(l =>
    `<div class="breakdown-line" style="${l.bold ? 'font-weight:700' : ''}"><span>${l.label}</span><span>${l.value}</span></div>`
  ).join('');

  // Advice
  const advice = $('adviceText');
  if (profit === null) {
    advice.textContent = 'Enter raw and refined prices to calculate profit.';
  } else if (profit > 0) {
    const cityAdvice = isBonus
      ? 'You\'re refining in the right bonus city.'
      : 'Consider refining in the bonus city for this resource.';
    advice.innerHTML = `<span style="color:var(--green)">✅ Profitable: ${profit.toFixed(0)} silver per craft.</span> ${cityAdvice}` + (
      spf !== null && spf > 0
        ? ` SPF: ${spf.toFixed(2)} silver.`
        : ''
    );
  } else {
    advice.innerHTML = `<span style="color:var(--red)">❌ Not profitable: ${profit.toFixed(0)} silver per craft.</span> Try different prices, city, or tier.`;
  }
}

function calcProfitNoFocus(res, tier, ench, city, daily, fee, raw, ref, filler) {
  let pb = 18;
  if (BONUS_CITIES[res] === city) pb += 40;
  pb += daily;
  const rrr = pb / (100 + pb);
  const recipe = RECIPES[tier] || RECIPES[4];
  const netRaw = recipe.raw * (1 - rrr);
  const netFiller = recipe.filler * (1 - rrr);
  if (!raw || !ref) return 0;
  const matCost = netRaw * raw + (filler && netFiller ? netFiller * filler : 0);
  const rev = recipe.refined * ref;
  const station = matCost * (fee / 100);
  return rev - matCost - station;
}

// ---- AODP price fetching ----
const AODP_BASE = 'https://www.albion-online-data.com/api/v2/stats';

function getItemIds(res, tier, ench) {
  const map = {
    wood: { raw: 'WOOD', refined: 'PLANKS' },
    ore: { raw: 'ORE', refined: 'METALBAR' },
    fiber: { raw: 'FIBER', refined: 'CLOTH' },
    hide: { raw: 'HIDE', refined: 'LEATHER' },
    stone: { raw: 'ROCK', refined: 'STONEBLOCK' },
  };
  const m = map[res];
  const enc = ench > 0 ? `_LEVEL${ench}@${ench}` : '';
  const prevTier = Math.max(1, parseInt(tier) - 1);
  return {
    raw: `T${tier}_${m.raw}${ench > 0 ? `@${ench}` : ''}`,
    refined: `T${tier}_${m.refined}${enc}`,
    filler: prevTier >= 2 ? `T${prevTier}_${m.refined}${enc}` : null,
  };
}

async function fetchPrice(itemId, city) {
  try {
    const url = `${AODP_BASE}/${itemId}?locations=${city}&qualities=1&time-scale=24`;
    const resp = await fetch(url);
    const data = await resp.json();
    if (data && data.length > 0 && data[0].sell_price_min) {
      return data[0].sell_price_min;
    }
    return null;
  } catch { return null; }
}

async function fetchRawPrice() {
  const res = resourceEl.value;
  const tier = tierEl.value;
  const ench = enchantEl.value;
  const city = cityEl.value;
  const ids = getItemIds(res, tier, ench);
  const price = await fetchPrice(ids.raw, city);
  if (price !== null) rawPrice.value = price;
  else alert('Could not fetch price. Try manually.');
  calc();
}

async function fetchRefinedPrice() {
  const res = resourceEl.value;
  const tier = tierEl.value;
  const ench = enchantEl.value;
  const city = cityEl.value;
  const ids = getItemIds(res, tier, ench);
  const price = await fetchPrice(ids.refined, city);
  if (price !== null) refinedPrice.value = price;
  else alert('Could not fetch price. Try manually.');
  calc();
}

async function fetchFillerPrice() {
  const res = resourceEl.value;
  const tier = tierEl.value;
  const ench = enchantEl.value;
  const city = cityEl.value;
  const ids = getItemIds(res, tier, ench);
  if (!ids.filler) { alert('No filler needed for this tier.'); return; }
  const price = await fetchPrice(ids.filler, city);
  if (price !== null) fillerPrice.value = price;
  else alert('Could not fetch filler price. Try manually.');
  calc();
}

$('fetchRawPrice').addEventListener('click', fetchRawPrice);
$('fetchRefinedPrice').addEventListener('click', fetchRefinedPrice);
$('fetchFillerPrice').addEventListener('click', fetchFillerPrice);

function updateFiller() {
  const tier = parseInt(tierEl.value);
  const res = resourceEl.value;
  const prevTier = tier - 1;
  const hasFiller = tier > 2;
  fillerGroup.style.display = hasFiller ? '' : 'none';
  if (hasFiller) {
    const label = RESOURCE_LABELS[res].split('→')[0].trim();
    fillerLabel.textContent = `Filler Price (T${prevTier} ${label} refined)`;
  }
}
resourceEl.addEventListener('change', updateFiller);
tierEl.addEventListener('change', updateFiller);

// ---- Event listeners ----
[resourceEl, tierEl, enchantEl, cityEl, focusToggle, dailyBonus, stationFee, specLevel, rawPrice, refinedPrice, fillerPrice]
  .forEach(el => el.addEventListener('change', calc));
rawPrice.addEventListener('input', calc);
refinedPrice.addEventListener('input', calc);
fillerPrice.addEventListener('input', calc);

// ---- Reference tabs ----
document.querySelectorAll('.ref-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ref-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.ref-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

// ---- Theme toggle ----
const themeToggle = $('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

// ---- Hamburger menu ----
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// ---- Init ----
updateBonus();
updateFiller();
calc();
