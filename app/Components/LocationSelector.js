"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Search, Plus, X } from "lucide-react";

export default function LocationSelector({ onLocationSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Search for locations using OpenCage Geocoding API
  const searchLocations = async (query) => {
    if (!query.trim() || query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API}&limit=5&countrycode=ng&language=en`
      );

      if (!response.ok) {
        throw new Error('Failed to search locations');
      }

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const formattedResults = data.results.map((result, index) => ({
          id: `search-${index}`,
          address: result.formatted,
          shortAddress: result.components.neighbourhood || 
                       result.components.suburb || 
                       result.components.city || 
                       result.components.town || 
                       result.components.village ||
                       'Unknown Location',
          coordinates: {
            latitude: result.geometry.lat,
            longitude: result.geometry.lng
          },
          components: result.components,
          isCurrentLocation: false
        }));
        
        setSearchResults(formattedResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      setError('Failed to search locations. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchLocations(searchQuery);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Focus input when component shows
  useEffect(() => {
    if (showAddLocation && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showAddLocation]);

  const handleLocationSelect = (location) => {
    onLocationSelect(location);
    setShowAddLocation(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleCancel = () => {
    setShowAddLocation(false);
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
  };

  if (!showAddLocation) {
    return (
      <button
        onClick={() => setShowAddLocation(true)}
        className="w-full px-4 py-3 text-left hover:bg-[var(--dropdown-hover)] transition-colors duration-200 flex items-center space-x-3"
      >
        <Plus className="w-5 h-5 text-[var(--primary-color)]" />
        <div className="flex-1">
          <div className="text-sm font-medium text-[var(--primary-color)]">
            Add new location
          </div>
          <div className="text-xs text-[var(--text-secondary)]">
            Search for a specific address
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="px-4 py-3 space-y-3">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-[var(--text-color)]">
          Add Location
        </div>
        <button
          onClick={handleCancel}
          className="p-1 hover:bg-[var(--button-hover)] rounded-lg transition-colors duration-200"
          aria-label="Cancel"
        >
          <X className="w-4 h-4 text-[var(--text-secondary)]" />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-[var(--text-secondary)]" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter address, neighborhood, or landmark..."
          className="w-full pl-10 pr-4 py-2 border border-[var(--navbar-border)] rounded-lg bg-[var(--input-bg)] text-[var(--text-color)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-200"
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="w-5 h-5 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-1 max-h-60 overflow-y-auto">
          <div className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider px-1 mb-2">
            Search Results
          </div>
          {searchResults.map((location) => (
            <button
              key={location.id}
              onClick={() => handleLocationSelect(location)}
              className="w-full px-3 py-2 text-left hover:bg-[var(--button-hover)] rounded-lg transition-colors duration-200 flex items-start space-x-3"
            >
              <MapPin className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[var(--text-color)] truncate">
                  {location.shortAddress}
                </div>
                <div className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {location.address}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {searchQuery.length >= 3 && !isSearching && searchResults.length === 0 && !error && (
        <div className="text-center py-4 text-sm text-[var(--text-secondary)]">
          No locations found for "{searchQuery}". Try a different search term.
        </div>
      )}

      {/* Search Instruction */}
      {searchQuery.length < 3 && !isSearching && (
        <div className="text-center py-4 text-sm text-[var(--text-secondary)]">
          Type at least 3 characters to search for locations
        </div>
      )}
    </div>
  );
}