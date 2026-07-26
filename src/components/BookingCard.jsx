import { useMemo, useState } from 'react';
import Icon from './Icon.jsx';
import {
  bookingTabs,
  bookingForms,
  cityOptions,
  company,
} from '../data.js';
import '../styles/BookingCard.css';

const emptyLeg = () => ({ from: '', to: '', date: '' });

export default function BookingCard() {
  const [tab, setTab] = useState('flights');
  const [toggles, setToggles] = useState({});   // { flights: 'oneway', hotels: 'domestic', ... }
  const [values, setValues] = useState({});     // { flights: { from: '...' }, ... }
  const [legs, setLegs] = useState([emptyLeg(), emptyLeg()]); // multi-city only

  const form = bookingForms[tab];
  const toggle = toggles[tab] ?? form.toggles?.[0]?.id;
  const data = values[tab] || {};

  const isMultiCity = tab === 'flights' && toggle === 'multi';

  const setField = (name, value) =>
    setValues((prev) => ({ ...prev, [tab]: { ...(prev[tab] || {}), [name]: value } }));

  const setLeg = (i, name, value) =>
    setLegs((prev) => prev.map((leg, idx) => (idx === i ? { ...leg, [name]: value } : leg)));

  const swap = (aName, bName) => {
    const a = data[aName] || '';
    const b = data[bName] || '';
    setValues((prev) => ({ ...prev, [tab]: { ...(prev[tab] || {}), [aName]: b, [bName]: a } }));
  };

  const swapLeg = (i) =>
    setLegs((prev) => prev.map((leg, idx) => (idx === i ? { ...leg, from: leg.to, to: leg.from } : leg)));

  const isOff = (field) => Boolean(field.disabledWhen?.includes(toggle));

  // Builds a readable enquiry out of whatever the visitor filled in.
  const summary = useMemo(() => {
    const tabLabel = bookingTabs.find((t) => t.id === tab)?.label || tab;
    const toggleLabel = form.toggles?.find((o) => o.id === toggle)?.label;
    const lines = [`${tabLabel} enquiry${toggleLabel ? ` (${toggleLabel})` : ''}`];

    if (isMultiCity) {
      legs.forEach((leg, i) => {
        if (leg.from || leg.to || leg.date)
          lines.push(`Flight ${i + 1}: ${leg.from || '?'} to ${leg.to || '?'} ${leg.date || ''}`.trim());
      });
      if (data.travellers) lines.push(`Travellers: ${data.travellers}`);
      if (data.cabin) lines.push(`Class: ${data.cabin}`);
    } else {
      form.rows.flatMap((r) => r.fields).forEach((f) => {
        if (isOff(f)) return;
        const v = data[f.name];
        if (v) lines.push(`${f.label}: ${v}`);
      });
    }
    return lines.join('\n');
  }, [tab, toggle, values, legs]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e) => {
    e.preventDefault();
    // Sends the enquiry to WhatsApp. Swap `company.phone` in data.js for the real number,
    // or replace this block with your own API call.
    const number = (company.whatsapp || company.phone || '').replace(/\D/g, '');
    if (!number) return;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(summary)}`, '_blank', 'noopener');
  };

  return (
    <form className="bookcard" onSubmit={submit}>
      <div className="bookcard__tabs" role="tablist">
        {bookingTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`bookcard__tab ${tab === t.id ? 'is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <Icon name={t.icon} size={20} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="bookcard__body">
        {form.toggles?.length > 0 && (
          <div className="bookcard__trip" role="radiogroup" aria-label={`${tab} options`}>
            {form.toggles.map((o) => (
              <label key={o.id} className={`radio ${toggle === o.id ? 'is-active' : ''}`}>
                <input
                  type="radio"
                  name={`toggle-${tab}`}
                  value={o.id}
                  checked={toggle === o.id}
                  onChange={() => setToggles((prev) => ({ ...prev, [tab]: o.id }))}
                />
                <span className="radio__dot" aria-hidden="true" />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        )}

        {isMultiCity ? (
          <>
            {legs.map((leg, i) => (
              <div key={i} className="bookcard__leg">
                <div className="bookcard__leg-head">
                  <span>Flight {i + 1}</span>
                  {legs.length > 2 && (
                    <button
                      type="button"
                      className="bookcard__leg-remove"
                      onClick={() => setLegs((prev) => prev.filter((_, idx) => idx !== i))}
                    >
                      <Icon name="close" size={14} /> Remove
                    </button>
                  )}
                </div>
                <div className="bookcard__route">
                  <Field
                    field={{ name: 'from', label: 'From', placeholder: 'Select departure city', icon: 'pin', list: 'cities' }}
                    value={leg.from}
                    onChange={(v) => setLeg(i, 'from', v)}
                  />
                  <button type="button" className="bookcard__swap" aria-label="Swap cities" onClick={() => swapLeg(i)}>
                    <Icon name="swap" size={18} />
                  </button>
                  <Field
                    field={{ name: 'to', label: 'To', placeholder: 'Select destination city', icon: 'pin', list: 'cities' }}
                    value={leg.to}
                    onChange={(v) => setLeg(i, 'to', v)}
                  />
                </div>
                <Field
                  field={{ name: 'date', label: 'Depart Date', kind: 'date', placeholder: 'Select date', icon: 'calendar' }}
                  value={leg.date}
                  onChange={(v) => setLeg(i, 'date', v)}
                />
              </div>
            ))}

            {legs.length < 5 && (
              <button type="button" className="bookcard__addleg" onClick={() => setLegs((prev) => [...prev, emptyLeg()])}>
                <Icon name="arrow-right" size={16} /> Add another city
              </button>
            )}

            <div className="bookcard__grid">
              <Field
                field={{ name: 'travellers', label: 'Travellers', kind: 'select', icon: 'user', placeholder: '1 Traveller',
                  options: ['1 Traveller', '2 Travellers', '3 Travellers', '4 Travellers', '5 Travellers', '6+ Travellers'] }}
                value={data.travellers}
                onChange={(v) => setField('travellers', v)}
              />
              <Field
                field={{ name: 'cabin', label: 'Class', kind: 'select', icon: 'plane', placeholder: 'Economy',
                  options: ['Economy', 'Premium Economy', 'Business', 'First Class'] }}
                value={data.cabin}
                onChange={(v) => setField('cabin', v)}
              />
            </div>
          </>
        ) : (
          form.rows.map((row, i) => {
            if (row.kind === 'route') {
              const [a, b] = row.fields;
              return (
                <div key={i} className="bookcard__route">
                  <Field field={a} value={data[a.name]} onChange={(v) => setField(a.name, v)} />
                  <button type="button" className="bookcard__swap" aria-label="Swap cities" onClick={() => swap(a.name, b.name)}>
                    <Icon name="swap" size={18} />
                  </button>
                  <Field field={b} value={data[b.name]} onChange={(v) => setField(b.name, v)} />
                </div>
              );
            }
            if (row.kind === 'pair') {
              return (
                <div key={i} className="bookcard__grid">
                  {row.fields.map((f) => (
                    <Field key={f.name} field={f} value={data[f.name]} disabled={isOff(f)} onChange={(v) => setField(f.name, v)} />
                  ))}
                </div>
              );
            }
            return row.fields.map((f) => (
              <Field key={f.name} field={f} value={data[f.name]} disabled={isOff(f)} onChange={(v) => setField(f.name, v)} />
            ));
          })
        )}

        <button type="submit" className="btn btn--navy bookcard__submit">
          <Icon name="search" size={18} />
          {form.submitLabel}
        </button>
      </div>

      <datalist id="cb-cities">
        {cityOptions.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </form>
  );
}

/* ------------------------------------------------------------------------ */

function Field({ field, value = '', onChange, disabled = false }) {
  const { label, placeholder, icon, kind = 'text', options, list } = field;
  const [dateMode, setDateMode] = useState(false);

  return (
    <label className={`field ${disabled ? 'is-disabled' : ''}`}>
      <span className="field__label">{label}</span>
      <span className="field__control">
        {kind === 'select' ? (
          <select
            className={value ? '' : 'is-placeholder'}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">{placeholder}</option>
            {options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        ) : kind === 'date' ? (
          // Shows the placeholder until clicked, then turns into a real date picker.
          <input
            type={dateMode || value ? 'date' : 'text'}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onFocus={() => setDateMode(true)}
            onBlur={() => setDateMode(false)}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            list={list === 'cities' ? 'cb-cities' : undefined}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        <Icon name={icon} size={18} />
      </span>
    </label>
  );
}
