import Header from "@/components/Header";
import PrimateCard from "@/components/PrimateCard";
import { getAllEntries } from "@/utils/entryStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Shuffle } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/monkedex-logo.png";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<string | null>(null);
  const navigate = useNavigate();
  const allEntries = getAllEntries();

  // Get unique species and media types from actual entries
  const speciesCounts = useMemo(() => {
    const speciesMap = new Map<string, number>();
    allEntries.forEach(entry => {
      speciesMap.set(entry.species, (speciesMap.get(entry.species) || 0) + 1);
    });
    return Array.from(speciesMap.entries())
      .map(([species, count]) => ({ species, count }))
      .sort((a, b) => a.species.localeCompare(b.species));
  }, [allEntries]);

  const mediaTypeCounts = useMemo(() => {
    const mediaTypeMap = new Map<string, number>();
    const mediaTypeLabels: Record<string, string> = {
      'film': 'Film',
      'tv': 'TV',
      'video-game': 'Video Game',
      'meme': 'Meme',
      'pop-culture': 'Pop Culture',
      'fashion': 'Fashion',
      'other': 'Other'
    };
    
    allEntries.forEach(entry => {
      mediaTypeMap.set(entry.mediaType, (mediaTypeMap.get(entry.mediaType) || 0) + 1);
    });
    
    return Array.from(mediaTypeMap.entries())
      .map(([mediaType, count]) => ({ 
        mediaType, 
        label: mediaTypeLabels[mediaType] || mediaType,
        count 
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [allEntries]);

  const filteredEntries = allEntries.filter(entry => {
    let matchesSearch = true;
    let matchesSpecies = true;
    let matchesMediaType = true;

    // Check search
    if (searchQuery) {
      matchesSearch = 
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.species.toLowerCase().includes(searchQuery.toLowerCase());
    }

    // Check species filter
    if (selectedSpecies) {
      matchesSpecies = entry.species === selectedSpecies;
    }

    // Check media type filter
    if (selectedMediaType) {
      matchesMediaType = entry.mediaType === selectedMediaType;
    }

    return matchesSearch && matchesSpecies && matchesMediaType;
  });

  const handleShuffle = () => {
    if (allEntries.length > 0) {
      const randomEntry = allEntries[Math.floor(Math.random() * allEntries.length)];
      navigate(`/entry/${randomEntry.id}`);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSpecies(null);
    setSelectedMediaType(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <img src={logo} alt="The Monkedex" className="h-16 md:h-24 mb-4" />
          <p className="text-muted-foreground text-sm max-w-2xl mb-8">
            A personal catalog for tracking the monkeys that appear across film, games, and pop culture.
          </p>

          <div className="flex gap-4 mb-8 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, title, or species..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-mono text-sm"
              />
            </div>
            <Button
              onClick={handleShuffle}
              variant="outline"
              size="default"
              className="gap-2"
            >
              <Shuffle className="h-4 w-4" />
              Random
            </Button>
          </div>

          {/* Species Filter */}
          <div className="mb-8">
            <h2 className="text-xl font-mono mb-4">BY SPECIES</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={clearFilters}
                className={`px-4 py-2 text-sm border border-border transition-colors ${
                  selectedSpecies === null && selectedMediaType === null && searchQuery === "" 
                    ? 'bg-foreground text-background' 
                    : 'hover:bg-accent'
                }`}
              >
                All ({allEntries.length})
              </button>
              {speciesCounts.map(({ species, count }) => (
                <button
                  key={species}
                  onClick={() => setSelectedSpecies(species === selectedSpecies ? null : species)}
                  className={`px-4 py-2 text-sm border border-border transition-colors ${
                    selectedSpecies === species ? 'bg-foreground text-background' : 'hover:bg-accent'
                  }`}
                >
                  {species} ({count})
                </button>
              ))}
            </div>
          </div>

          {/* Media Type Filter */}
          <div className="mb-8">
            <h2 className="text-xl font-mono mb-4">BY MEDIA TYPE</h2>
            <div className="flex flex-wrap gap-2">
              {mediaTypeCounts.map(({ mediaType, label, count }) => (
                <button
                  key={mediaType}
                  onClick={() => setSelectedMediaType(mediaType === selectedMediaType ? null : mediaType)}
                  className={`px-4 py-2 text-sm border border-border transition-colors ${
                    selectedMediaType === mediaType ? 'bg-foreground text-background' : 'hover:bg-accent'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid-archive">
          {filteredEntries.map((entry) => (
            <PrimateCard key={entry.id} entry={entry} />
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No entries found
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
