/**
 * Address Autocomplete Component
 * Hooks into input fields and displays Google Maps styled address predictions.
 * Support dynamic fallback to OpenStreetMap Nominatim if no Google Maps API is loaded.
 */

// Popular Mexican transportation hubs and landmarks to show as presets when input is empty
const PRESETS = [
  {
    primary: "Aeropuerto Internacional Benito Juárez (MEX)",
    secondary: "Av. Capitán Carlos León S/N, Peñón de los Baños, Ciudad de México, México"
  },
  {
    primary: "Ángel de la Independencia",
    secondary: "Av. Paseo de la Reforma, Juárez, Ciudad de México, México"
  },
  {
    primary: "Palacio de Bellas Artes",
    secondary: "Av. Juárez S/N, Centro Histórico, Ciudad de México, México"
  },
  {
    primary: "Zócalo (Plaza de la Constitución)",
    secondary: "Plaza de la Constitución S/N, Centro Histórico, Ciudad de México, México"
  },
  {
    primary: "Terminal Central de Autobuses del Norte",
    secondary: "Eje Central Lázaro Cárdenas 4907, Magdalena de las Salinas, Ciudad de México, México"
  },
  {
    primary: "Terminal de Autobuses del Sur (Taxqueña)",
    secondary: "Calz. de Tlalpan 2205, Coyoacán, Ciudad de México, México"
  },
  {
    primary: "Aeropuerto Internacional de Guadalajara (GDL)",
    secondary: "Carretera Guadalajara - Chapala Km 17.5, Tlajomulco de Zúñiga, Jalisco, México"
  },
  {
    primary: "Central de Autobuses de Guadalajara",
    secondary: "Carretera Libre a Zapotlanejo, San Pedro Tlaquepaque, Jalisco, México"
  },
  {
    primary: "Aeropuerto Internacional de Monterrey (MTY)",
    secondary: "Carretera Miguel Alemán Km 24, Apodaca, Nuevo León, México"
  },
  {
    primary: "Central de Autobuses de Monterrey",
    secondary: "Av. Colón 855, Centro, Monterrey, Nuevo León, México"
  },
  {
    primary: "Basílica de Santa María de Guadalupe",
    secondary: "Fray Juan de Zumárraga No. 2, Villa de Guadalupe, Ciudad de México, México"
  }
];

// Helper to debounce API calls
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Highlight the matching characters in bold
function highlightMatch(text, query) {
  if (!query) return text;
  const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return text.replace(regex, '<strong>$1</strong>');
}

/**
 * Initializes Google Maps style Autocomplete on an input field.
 * @param {HTMLInputElement} inputElement 
 */
export function initAddressAutocomplete(inputElement) {
  if (!inputElement) return;

  const parentGroup = inputElement.closest('.input-group');
  if (!parentGroup) return;

  // 1. Create Dropdown Element
  let dropdown = parentGroup.querySelector('.autocomplete-dropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.className = 'autocomplete-dropdown';
    parentGroup.appendChild(dropdown);
  }

  let activeIndex = -1;
  let suggestions = [];

  // Helper to show/hide
  const showDropdown = () => dropdown.classList.add('show');
  const hideDropdown = () => {
    dropdown.classList.remove('show');
    activeIndex = -1;
  };

  // 2. Fetch and render suggestions
  const fetchSuggestions = (query) => {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      // Empty query shows presets
      suggestions = PRESETS;
      renderSuggestions(suggestions, "");
      showDropdown();
      return;
    }

    // A. Check if official Google Maps API is loaded and has Places SDK
    if (window.google && window.google.maps && window.google.maps.places) {
      try {
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
          { 
            input: cleanQuery, 
            types: ['geocode', 'establishment'],
            componentRestrictions: { country: 'mx' }
          },
          (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
              suggestions = predictions.map(p => ({
                primary: p.structured_formatting.main_text,
                secondary: p.structured_formatting.secondary_text || ""
              }));
              renderSuggestions(suggestions, cleanQuery);
              showDropdown();
            } else {
              // Fallback to OSM if Google service returns no results or fails
              fetchOSMNominatim(cleanQuery);
            }
          }
        );
        return;
      } catch (e) {
        console.warn("Failed querying Google Places SDK, falling back to OSM Nominatim:", e);
      }
    }

    // B. Fallback to OpenStreetMap Nominatim (Free, keyless, global search)
    fetchOSMNominatim(cleanQuery);
  };

  const fetchOSMNominatim = (query) => {
    // Add custom User-Agent in query parameters as required by OSM terms, restricted to Mexico (countrycodes=mx)
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&countrycodes=mx`;
    
    fetch(url, {
      headers: {
        'Accept-Language': 'es,en;q=0.9'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("OSM server error");
        return res.json();
      })
      .then(data => {
        suggestions = data.map(item => {
          const parts = item.display_name.split(',');
          const primary = parts[0].trim();
          // Take next 3 components for a short, readable secondary address
          const secondary = parts.slice(1, 4).map(p => p.trim()).join(', ');
          return { primary, secondary };
        });

        renderSuggestions(suggestions, query);
        showDropdown();
      })
      .catch(err => {
        console.error("OSM Geocoding fallback failed:", err);
        // Fallback to offline presets filtered locally
        const filteredPresets = PRESETS.filter(p => 
          p.primary.toLowerCase().includes(query.toLowerCase()) || 
          p.secondary.toLowerCase().includes(query.toLowerCase())
        );
        suggestions = filteredPresets;
        renderSuggestions(suggestions, query);
        showDropdown();
      });
  };

  // Render the items in the dropdown
  const renderSuggestions = (items, query) => {
    dropdown.innerHTML = "";

    if (items.length === 0) {
      dropdown.innerHTML = `
        <div class="autocomplete-item" style="cursor: default; color: var(--text-muted); font-size: 0.85rem;">
          No se encontraron resultados
        </div>
      `;
      return;
    }

    items.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'autocomplete-item';
      itemEl.dataset.index = index;

      const highlightedPrimary = highlightMatch(item.primary, query);

      itemEl.innerHTML = `
        <div class="autocomplete-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="autocomplete-text">
          <span class="autocomplete-title">${highlightedPrimary}</span>
          <span class="autocomplete-subtitle">${item.secondary}</span>
        </div>
      `;

      // Handle item click/select
      itemEl.addEventListener('mousedown', (e) => {
        // Prevent default input blur so this click completes
        e.preventDefault();
        selectItem(item);
      });

      dropdown.appendChild(itemEl);
    });

    // Add "Powered by Google" watermark to mimic the exact Google Maps autocomplete layout
    const footer = document.createElement('div');
    footer.className = 'autocomplete-footer';
    footer.innerHTML = `
      <span>Direcciones vía</span>
      <div class="autocomplete-google-logo">
        <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
      </div>
      <span>&amp; Maps</span>
    `;
    dropdown.appendChild(footer);
  };

  const selectItem = (item) => {
    const fullVal = item.secondary ? `${item.primary}, ${item.secondary}` : item.primary;
    inputElement.value = fullVal;
    
    // Dispatch events to let form validations / calculators know of value update
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    
    hideDropdown();
  };

  const updateActiveState = (items) => {
    items.forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });
  };

  // Debounced input searcher
  const debouncedSearch = debounce((val) => {
    fetchSuggestions(val);
  }, 250);

  // 3. Event Listeners
  inputElement.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });

  inputElement.addEventListener('focus', () => {
    fetchSuggestions(inputElement.value);
  });

  inputElement.addEventListener('blur', () => {
    // Timeout gives space for mousedown clicks on list items to process first
    setTimeout(hideDropdown, 200);
  });

  inputElement.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.autocomplete-item');
    if (!dropdown.classList.contains('show') || items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActiveState(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActiveState(items);
    } else if (e.key === 'Enter') {
      // If we have an active highlighted suggestion, select it
      if (activeIndex >= 0 && activeIndex < items.length) {
        e.preventDefault();
        selectItem(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      hideDropdown();
      inputElement.blur();
    }
  });
}
