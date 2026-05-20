import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from './productSlice';

export default function PriceRangeFilter() {
  const dispatch = useDispatch();
  const { priceRange } = useSelector((state) => state.products.filters);
  const [minVal, maxVal] = priceRange;

  const [enforceMax, setEnforceMax] = useState(maxVal != null);
  const [maxDraft, setMaxDraft] = useState(maxVal != null ? String(maxVal) : '');

  useEffect(() => {
    const hasMax = maxVal != null;
    setEnforceMax(hasMax);
    setMaxDraft(hasMax ? String(maxVal) : '')
  }, [maxVal]);

  const noMaxLimit = !enforceMax;

  const applyPriceRange = (nextMin, nextMax = null) => {
    dispatch(setFilters({ priceRange: [nextMin, nextMax] }));
  };

  const handleMinChange = (e) => {
    const upperBound = maxVal == null ? Number.POSITIVE_INFINITY : maxVal;
    const nextMin = Math.max(0, Math.min(Number(e.target.value), upperBound));
    applyPriceRange(nextMin, maxVal);
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    setMaxDraft(value);
    if (value === '') return;
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;
    applyPriceRange(minVal, Math.max(parsed, minVal));
  };

  const handleNoMaxToggle = () => {
    if (noMaxLimit) {
      setEnforceMax(true);
      setMaxDraft('');
      return;
    }
    setEnforceMax(false);
    setMaxDraft('');
    applyPriceRange(minVal, null);
  };
  const displayMax =
    noMaxLimit || maxDraft === ''
      ? 'Any'
      : Number.isFinite(Number(maxDraft))
        ? `$${maxDraft}`
        : 'Any';


  return (
    <div className='filter-group'>
      <h3>Price Range</h3>

      <div className='price-range-display'>
        <span className='price-range-val'>${minVal}</span>
        <span className='price-range-sep'>—</span>
        <span className='price-range-val'>
          {displayMax}
        </span>
      </div>

      <div className='price-inputs'>
        <input type='number' min={0} value={minVal} onChange={handleMinChange} className='app-input' />
        <span>to</span>
        <input
          type='number'
          min={minVal}
          value={maxDraft}
          onChange={handleMaxChange}
          disabled={noMaxLimit}
          className='app-input'
        />
      </div>

      <label className='price-no-limit'>
        <input type='checkbox' checked={noMaxLimit} onChange={handleNoMaxToggle} />
        No maximum price
      </label>
    </div>
  );
}
