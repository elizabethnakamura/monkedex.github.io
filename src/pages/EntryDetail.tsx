import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { getAllEntries } from '@/utils/entryStorage';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUserEntryData } from '@/hooks/useUserEntryData';

const EntryDetail = () => {
  const { id } = useParams();
  const allEntries = getAllEntries();
  const entry = allEntries.find(e => e.id === id);
  const { data, updateData } = useUserEntryData(id || '');

  const currentIndex = allEntries.findIndex(e => e.id === id);
  const previousEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const nextEntry = currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;

  if (!entry) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-muted-foreground">Entry not found</p>
          <Link to="/">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Index
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/">
          <Button variant="outline" size="sm" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Index
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square bg-muted border border-border">
              <img 
                src={entry.imageUrl} 
                alt={entry.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-mono mb-2">{entry.name}</h1>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <MetadataRow label="Species" value={entry.species} />
              <MetadataRow label="Media Type" value={entry.mediaType} />
              <MetadataRow label="Title" value={entry.title} />
              <MetadataRow label="Year" value={entry.year.toString()} />
              <MetadataRow label="Country" value={entry.country} />
              <MetadataRow label="Format" value={entry.realOrAnimated} />
              {entry.submittedBy && (
                <MetadataRow label="Submitted by" value={entry.submittedBy} />
              )}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <dt className="text-muted-foreground font-mono">ID</dt>
                <dd className="col-span-2 font-mono text-muted-foreground text-xs">{entry.id}</dd>
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasSeen" 
                  checked={data.hasSeen}
                  onCheckedChange={(checked) => updateData({ hasSeen: checked as boolean })}
                />
                <Label htmlFor="hasSeen" className="text-sm font-mono cursor-pointer">
                  I've seen this monkey
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-mono">
                  Personal Notes
                </Label>
                <Textarea
                  id="notes"
                  value={data.notes}
                  onChange={(e) => updateData({ notes: e.target.value })}
                  placeholder="Add your thoughts about this entry..."
                  className="min-h-[100px] font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          {previousEntry ? (
            <Link to={`/entry/${previousEntry.id}`}>
              <Button variant="outline" size="sm">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
          
          {nextEntry ? (
            <Link to={`/entry/${nextEntry.id}`}>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </main>
    </div>
  );
};

const MetadataRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-3 gap-4 text-sm">
    <dt className="text-muted-foreground font-mono">{label}</dt>
    <dd className="col-span-2 font-mono capitalize">{value}</dd>
  </div>
);

export default EntryDetail;
