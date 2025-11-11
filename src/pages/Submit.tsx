import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SPECIES_OPTIONS, MEDIA_TYPE_OPTIONS } from '@/types/primate';
import { parseCSV } from '@/utils/csvParser';
import { addUserEntry, generateEntryId } from '@/utils/entryStorage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Download } from 'lucide-react';

const Submit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    mediaType: '',
    title: '',
    year: '',
    country: '',
    realOrAnimated: '',
    sourceLink: '',
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target?.result as string;
        const entries = parseCSV(csvText);
        
        if (entries.length === 0) {
          toast.error('No valid entries found in CSV');
          return;
        }
        
        navigate('/submit/review', { state: { entries } });
      };
      reader.readAsText(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryId = generateEntryId(formData.name, formData.title, parseInt(formData.year));
    
    const newEntry = {
      id: entryId,
      name: formData.name,
      species: formData.species,
      mediaType: formData.mediaType as any,
      title: formData.title,
      year: parseInt(formData.year),
      country: formData.country,
      realOrAnimated: formData.realOrAnimated as any,
      imageUrl: imagePreview || 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800',
      submittedBy: 'User',
    };
    
    addUserEntry(newEntry);
    toast.success('Entry published to the archive!');
    
    // Reset form
    setFormData({
      name: '',
      species: '',
      mediaType: '',
      title: '',
      year: '',
      country: '',
      realOrAnimated: '',
      sourceLink: '',
    });
    setImageFile(null);
    setImagePreview('');
    
    // Navigate to the new entry
    setTimeout(() => navigate(`/entry/${entryId}`), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-mono mb-4">LOG ENTRY</h1>
          <p className="text-muted-foreground text-sm">
            Add a new primate appearance to the archive. Entries are published instantly to the community.
          </p>
        </div>

        {/* Single Entry Form */}
        <form onSubmit={handleSubmit} className="space-y-6 border border-border p-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-mono text-sm">Name / Character Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="species" className="font-mono text-sm">Species *</Label>
            <Select 
              required
              value={formData.species}
              onValueChange={(value) => setFormData({ ...formData, species: value })}
            >
              <SelectTrigger className="font-mono">
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                {SPECIES_OPTIONS.map(species => (
                  <SelectItem key={species} value={species} className="font-mono">
                    {species}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mediaType" className="font-mono text-sm">Media Type *</Label>
            <Select 
              required
              value={formData.mediaType}
              onValueChange={(value) => setFormData({ ...formData, mediaType: value })}
            >
              <SelectTrigger className="font-mono">
                <SelectValue placeholder="Select media type" />
              </SelectTrigger>
              <SelectContent>
                {MEDIA_TYPE_OPTIONS.map(type => (
                  <SelectItem key={type.value} value={type.value} className="font-mono">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="font-mono text-sm">Title of Appearance *</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="font-mono"
              placeholder="e.g. Planet of the Apes"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year" className="font-mono text-sm">Year *</Label>
              <Input
                id="year"
                type="number"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="font-mono"
                min="1895"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="font-mono text-sm">Country *</Label>
              <Input
                id="country"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="font-mono"
                placeholder="e.g. USA"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="realOrAnimated" className="font-mono text-sm">Format *</Label>
            <Select 
              required
              value={formData.realOrAnimated}
              onValueChange={(value) => setFormData({ ...formData, realOrAnimated: value })}
            >
              <SelectTrigger className="font-mono">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physical" className="font-mono">Physical</SelectItem>
                <SelectItem value="animated" className="font-mono">Animated</SelectItem>
                <SelectItem value="cgi" className="font-mono">CGI / Digital</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="font-mono text-sm">Image (optional)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="font-mono"
            />
            {imagePreview && (
              <div className="mt-4 border border-border p-4">
                <p className="text-xs text-muted-foreground font-mono mb-2">Preview:</p>
                <img src={imagePreview} alt="Preview" className="max-h-48 object-contain" />
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Note: For GitHub workflow, save image as [charactername]_[title]_[year].jpg in src/assets/
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sourceLink" className="font-mono text-sm">Source Link (optional)</Label>
            <Input
              id="sourceLink"
              type="url"
              value={formData.sourceLink}
              onChange={(e) => setFormData({ ...formData, sourceLink: e.target.value })}
              className="font-mono"
              placeholder="https://..."
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full font-mono">
              Publish Entry
            </Button>
          </div>
        </form>

        <div className="mt-8 mb-6 text-center">
          <p className="text-sm text-muted-foreground font-mono">OR</p>
        </div>

        {/* CSV Upload Section */}
        <div className="border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-mono">Bulk Upload (CSV)</h2>
            <a href="/monkedex_entry_template.csv" download>
              <Button variant="outline" size="sm" className="font-mono">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </a>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="csv-upload" className="font-mono text-sm">
              Upload CSV File
            </Label>
            <Input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Upload a CSV file to submit multiple entries at once. You'll be able to review and add images before final submission.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Submit;
