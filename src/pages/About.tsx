import Header from '@/components/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <h1 className="text-4xl font-mono mb-8">ABOUT MONKEDEX</h1>
          
          <div className="space-y-6 text-sm leading-relaxed text-foreground/90">
            <p>
              Monkedex began as a small fixation, a way to keep track of the monkeys that keep finding their way into film, television, games, and every other corner of culture. They appear in places they shouldn't, acting out our habits, wearing our expressions, mirroring our performances back to us.
            </p>
            
            <p>
              This tool exists to track those sightings — not as science, but as sentiment. Each entry is saved quietly to your browser's local storage, a secret menagerie tucked inside your cache. No servers, no cloud, no surveillance. Just you and your monkeys.
            </p>
            
            <p>
              Delete your history and they vanish. Export a CSV and they live again elsewhere. Such is the fragile ecology of memory.
            </p>
          </div>

          <ul className="space-y-3 my-8 list-disc list-inside text-sm text-muted-foreground">
            <li>Everything is saved locally in your browser.</li>
            <li>Your entries are private to this device.</li>
            <li>Clearing your history will erase them.</li>
            <li>You can export your archive anytime to keep a copy elsewhere.</li>
          </ul>

          <div className="space-y-6 text-sm leading-relaxed text-foreground/90">
            <p>
              Monkedex is meant to be personal. A casual catalog. A low-stakes archive for a high-volume obsession. A quiet place to gather evidence of how thoroughly the monkey has colonized our imagination.
            </p>
            
            <p>
              A private collection, curated in public. A record of sightings, gestures, echoes. A small celebration of monkeys in media.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
